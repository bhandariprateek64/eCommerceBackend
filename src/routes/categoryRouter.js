const express = require('express');
const Category = require('../models/Category');
const categoryRouter = express.Router();
const mongoose = require('mongoose');

// Adding a new category
categoryRouter.post('/categories', async (req, res) => {
  try {
    const { name, color, icon } = req.body;

    const category = new Category({ name, color, icon });
    const savedCategory = await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: savedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});
// Deleting a category by ID
categoryRouter.delete('/categories/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID',
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});
// Getting all categories
categoryRouter.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories.length) {
      return res.status(404).json({
        success: false,
        message: 'No categories found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});
// Getting a category by ID
categoryRouter.get('/categories/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID',
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});
// Updating a category by ID
categoryRouter.patch('/categories/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category ID',
      });
    }

    const { name, color, icon } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, color, icon },
      { new: true } // Return the updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

module.exports = categoryRouter;
