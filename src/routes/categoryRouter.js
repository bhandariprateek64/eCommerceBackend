const express = require('express');
const Category = require('../models/Category');
const categoryRouter = express.Router();
const mongoose = require('mongoose');

//Adding a new category
categoryRouter.post('/categories', async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
      color: req.body.color,
      icon: req.body.icon,
    });
    category = await category.save();
    if (!category) {
      res.status(404).send('Category not created');
    }
    res.json({ message: 'Category Created successfully', data: req.body });
  } catch (error) {
    res.status(404).send('Something Went Wrong', error);
  }
});

//Deleting a cateogry by id
categoryRouter.delete('/categories/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid category ID' });
    }

    // Attempt to delete the category
    const deletingTheCategory = await Category.findByIdAndDelete(id);
    if (!deletingTheCategory) {
      return res
        .status(404)
        .json({ success: false, message: 'Cannot delete the category' });
    }

    res.json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Getting all categories
categoryRouter.get('/categories', async (req, res) => {
  try {
    const allCategories = await Category.find();
    if (!allCategories) {
      res.status(404).send('No category found');
    }
    res.json({ message: 'Categories found', data: allCategories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Getting category by id
categoryRouter.get('/categories/:id', async (req, res) => {
  try {
    const id = req.params._id;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid category ID' });
    }

    const category = Category.findById(id);

    if (!category) {
      res.status(400).send('No category with this id');
    }
    res.json({
      message: 'category found',
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Updating the data
categoryRouter.patch('/categories/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon,
      },
      { returnDocument: 'before' }
    );
    if (!category) res.status(404).send('category not found');
    res.send('UPDATED SUCCESSFULLY');
  } catch (error) {
    res.status(404).send('Something went wrong!');
  }
});

module.exports = categoryRouter;
