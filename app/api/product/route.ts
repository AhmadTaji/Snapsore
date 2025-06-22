import { NextResponse } from 'next/server';
import Product from '@/models/Product'; // Your Mongoose model

export async function GET() {
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newProduct = new Product(data);
  await newProduct.save();
  return NextResponse.json(newProduct, { status: 201 });
}
