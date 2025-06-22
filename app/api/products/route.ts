// // app/api/products/route.ts

// import { NextResponse } from 'next/server';

// export async function GET() {
//   const products = [
//     { id: 1, name: 'Product A' },
//     { id: 2, name: 'Product B' },
//   ];

//   return NextResponse.json(products);
// }
// app/api/products/route.ts

// app/api/products/route.ts
// import { NextResponse } from 'next/server';

// export async function GET() {
//   const products = [
//     {
//       id: 1,
//       name: 'Product A',
//       category: 'Watches',
//       price: 49.99,
//       image: '/images/electronics.jpg',
//     },
//     {
//       id: 2,
//       name: 'Product B',
//       category: 'Watches',
//       price: 89.99,
//       image: '/images/home.jpg',
//     },
//     {
//       id: 3,
//       name: 'Product B',
//       category: 'Accessories',
//       price: 89.99,
//       image: '/images/fashion.jpg',
//     },
//     {
//       id: 4,
//       name: 'Product B',
//       category: 'Accessories',
//       price: 89.99,
//       image: '/images/fashion.jpg',
//     },
//     {
//       id: 5,
//       name: 'Product B',
//       category: 'Accessories',
//       price: 89.99,
//       image: '/images/fashion.jpg',
//     },
//     {
//       id: 6,
//       name: 'Product B',
//       category: 'Accessories',
//       price: 89.99,
//       image: '/images/fashion.jpg',
//     },
//     {
//       id: 7,
//       name: 'Product B',
//       category: 'Accessories',
//       price: 89.99,
//       image: '/images/fashion.jpg',
//     },
//     {
//       id: 8,
//       name: 'Product B',
//       category: 'Accessories',
//       price: 89.99,
//       image: '/images/fashion.jpg',
//     },
//     {
//       id: 9,
//       name: 'Product B',
//       category: 'Accessories',
//       price: 89.99,
//       image: '/images/fashion.jpg',
//     }
//   ];

//   return NextResponse.json(products);
// }
// import { NextResponse } from 'next/server';
// import {products } from "../../../utils/products"

// export async function GET() {
//   return NextResponse.json(products);
// }

import { NextResponse } from 'next/server';
import { products } from '../../../utils/products'; // Make sure this is mutable

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newProduct = {
    id: Math.max(...products.map((p) => p.id), 0) + 1,
    name: body.name,
    category: body.category,
    price: parseFloat(body.price),
    description: body.description,
    brand: body.brand,
    image: body.image || '/images/default.png',
  };

  products.push(newProduct);

  return NextResponse.json(newProduct, { status: 201 });
}