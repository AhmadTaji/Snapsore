import mongoose, { Schema, model, models } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  brand: String,
  image: String,
}, { timestamps: true });

const Product = models.Product || model('Product', productSchema);
export default Product;
