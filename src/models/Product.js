const mongoose = require('mongoose');
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    richDescription: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    images: {
      type: [{ type: String }],
    },
    countInStock: {
      type: Number,
      required: true,
      min: 0,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
