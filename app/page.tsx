// app/page.tsx

import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'SnapStore - Modern Tech Gadgets',
  description: 'Discover trending gadgets and accessories at SnapStore',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="w-full h-[80vh] bg-gray-100 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-5xl font-bold mb-4">Welcome to SnapStore</h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
            Your one-stop shop for modern tech gadgets and accessories.
          </p>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 bg-white max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-50 rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-64"
              />
              <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2">${product.price}</p>
              <Link
                href={`/products/${product.id}`}
                className="inline-block mt-4 text-sm text-blue-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const featuredProducts = [
  {
    id: '1',
    name: 'Smartphone',
    price: '99.99',
    image: '/images/electronics.jpg',
  },
  {
    id: '2',
    name: 'Accessories',
    price: '149.99',
    image: '/images/fashion.jpg',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: '39.99',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80',
  },
];
