import { NextResponse } from 'next/server';
import { products } from '../../../../utils/products';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  // Ensure type consistency between id and product.id
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}