const express = require('express');
const productRouter = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
//Posting a New product
productRouter.post('/product', async (req, res) => {
  try {
    const {
      name,
      description,
      richDescription,
      image,
      images,
      countInStock,
      brand,
      price,
      category,
      rating,
      numReviews,
      isFeatured,
    } = req.body;
    const isCategoriesValid = await Category.findById(category);
    if (!isCategoriesValid) {
      res.status(404).send('Category is invalid');
    }
    const product = new Product({
      name,
      description,
      richDescription,
      image,
      images,
      countInStock,
      brand,
      price,
      category,
      rating,
      numReviews,
      isFeatured,
    });
    const savedProduct = await product.save();
    if (!savedProduct) res.status(404).send('error saving the product');
    res.send('Product Added Successfully');
  } catch (error) {
    res.status(404).send('SOMETHING WENT WRONG');
  }
});
//Getting a product
productRouter.get('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).select(
      'name description brand price image images'
    );
    if (!product) {
      res.status(404).send('Cannot find product with this id');
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(404).send('SOMETHING WENT WRONG');
  }
});
//Getting all the products
productRouter.get('/product', async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.find().select(
      'name description brand price image images'
    );
    if (!products) {
      res.status(404).send('Cannot find any product');
    }
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(404).send('SOMETHING WENT WRONG');
  }
});
module.exports = productRouter;
