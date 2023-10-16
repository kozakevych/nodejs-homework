import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  id: String,
  userId: String,
  items: Array<String>,
  isDeleted: Boolean,
});

export const Cart = mongoose.model('Cart', cartSchema);