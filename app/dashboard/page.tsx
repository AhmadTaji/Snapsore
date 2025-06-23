
'use client';

import { useEffect, useState } from 'react';
import ProductCard from "../components/productCard"
import AddProductForm from '../components/AddProductForm';
import { Pagination } from '../components/Pagination';
import LoadingSpinner from '../components/loadingSpinner';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  brand: string;
  image: string;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/product');
        const data = await res.json();
        setProducts(data);
        console.log(data.length)
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  


  return (
    <section className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-xlg text-gray-500">{products.length}</p>
        </div>
      </header>
    </section>
  );
}

