import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  price: Number,
});

export const Product = mongoose.model('Product', productSchema);