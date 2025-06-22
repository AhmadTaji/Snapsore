'use client';

import { useEffect, useState } from 'react';
import LoadingSpinner from "../components/loadingSpinner";
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  brand?: string;
}

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        const wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

        if (wishlist.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Fetch products by IDs one by one
        const productPromises = wishlist.map((id) =>
          fetch(`http://localhost:3000/api/products/${id}`).then((res) => {
            if (!res.ok) throw new Error('Failed to fetch product');
            return res.json();
          })
        );

        const results = await Promise.all(productPromises);
        setProducts(results);
      } catch (error) {
        console.error('Failed to load wishlist products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, []);

  const handleRemoveFromWishlist = (productId: number) => {
    // Update localStorage
    let wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));

    // Update UI state
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  if (loading) return <LoadingSpinner />;

  if (products.length === 0)
    return <p className="text-center mt-8 text-gray-600">Your wishlist is empty.</p>;

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-semibold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
        {products.map((product) => (
          
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
          >
  <Link href={`/products/${product.id}`}>
  
 
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-3"
              loading="lazy"
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 mb-4">{product.category}</p>

            <button
              onClick={() => handleRemoveFromWishlist(product.id)}
              className="mt-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Remove from Wishlist
            </button>
             </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
