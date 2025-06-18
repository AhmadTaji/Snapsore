// import { NextResponse } from 'next/server';
// import { products } from '../../../../utils/products';

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   // Ensure type consistency between id and product.id
//   const product = products.find((p) => String(p.id) === id);

//   if (!product) {
//     return NextResponse.json({ error: 'Product not found' }, { status: 404 });
//   }

//   return NextResponse.json(product);
// }

import { NextResponse } from 'next/server';
import { products } from '../../../../utils/products'; // This is a local file, likely for demo/testing

// GET product by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const product = products.find((p) => String(p.id) === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// DELETE product by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const index = products.findIndex((p) => String(p.id) === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Remove the product from the array
  products.splice(index, 1);

  return NextResponse.json({ message: 'Product deleted successfully' });
}
