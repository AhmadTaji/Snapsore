import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mogodb';
import Product from '@/models/Product';

export async function GET() {
  await dbConnect();

  // Get distinct categories from DB
  const categories = await Product.distinct('category');

  return NextResponse.json(categories);
}
