const express = require('express');
const productRouter = express.Router();
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Get all products with optional category filter
productRouter.get('/product', async (req, res) => {
  try {
    const filter = {};
    const categories = req.query.categories;
    if (categories) {
      filter.category = { $in: categories.split(',') };
    }

    const products = await Product.find(filter)
      .select('name description category brand price image images')
      .populate('category');

    if (!products.length) {
      return res
        .status(404)
        .json({ success: false, message: 'No products found' });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get a single product by ID
productRouter.get('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(id).select(
      'name description brand price image images'
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
});

// Update a product by ID
productRouter.patch('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product ID' });
    }

    const isProductExist = await Product.findById(id);

    if (!isProductExist) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
});

// Delete a product by ID
productRouter.delete('/product/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get product count
productRouter.get('/product/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    res.status(200).json({ success: true, data: { count: productCount } });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
});

// Get featured products
productRouter.get('/product/featured', async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });

    if (!featuredProducts.length) {
      return res
        .status(404)
        .json({ success: false, message: 'No featured products found' });
    }

    res.status(200).json({ success: true, data: featuredProducts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = productRouter;
