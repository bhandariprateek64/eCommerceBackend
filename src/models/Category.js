const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    color: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
