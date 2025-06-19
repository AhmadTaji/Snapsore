import { NextResponse } from 'next/server';
import Product from '@/models/Product';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = await Product.findById(params.id);
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(product);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted successfully' });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  const updatedProduct = await Product.findByIdAndUpdate(params.id, data, { new: true });
  if (!updatedProduct) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updatedProduct);
}
