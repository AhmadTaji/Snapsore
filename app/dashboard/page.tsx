
'use client';

import { useEffect, useState } from 'react';
import { BarChart3, PlusCircle, RefreshCcw, Clock } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  brand: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
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
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const recentlyAdded = [...products]
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, 3);

  const recentlyEdited = [...products]
    .sort((a, b) => new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime())[0];

  return (
    <section className="space-y-6 mt-2 px-2">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-base text-gray-600">Welcome back! Here’s an overview of your store’s products.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-lg shadow p-4 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 opacity-80" />
          <div>
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="text-xs opacity-80">Total Products</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-400 text-white rounded-lg shadow p-4 flex items-center gap-3">
          <PlusCircle className="w-8 h-8 opacity-80" />
          <div>
            <div className="text-2xl font-bold">{recentlyAdded.length}</div>
            <div className="text-xs opacity-80">Recently Added</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-400 text-white rounded-lg shadow p-4 flex items-center gap-3">
          <RefreshCcw className="w-8 h-8 opacity-80" />
          <div>
            <div className="text-2xl font-bold">
              {recentlyEdited ? recentlyEdited.name : <span className="text-base">N/A</span>}
            </div>
            <div className="text-xs opacity-80">Recently Edited</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-base mb-2 flex items-center gap-2 text-blue-700">
            <PlusCircle className="w-4 h-4" /> Recently Added Products
          </h2>
          <ul className="divide-y divide-gray-100">
            {recentlyAdded.length > 0 ? recentlyAdded.map((p) => (
              <li key={p.id} className="py-2 flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category} • {p.brand}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-semibold">${p.price}</span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {p.createdAt ? new Date(p.createdAt).toLocaleString() : ''}
                  </span>
                </div>
              </li>
            )) : <li className="text-gray-400 py-2">No products yet</li>}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold text-base mb-2 flex items-center gap-2 text-yellow-700">
            <RefreshCcw className="w-4 h-4" /> Recently Edited Product
          </h2>
          {recentlyEdited ? (
            <div className="flex flex-col gap-1">
              <div className="font-medium text-gray-900">{recentlyEdited.name}</div>
              <div className="text-xs text-gray-500">{recentlyEdited.category} • {recentlyEdited.brand}</div>
              <div className="text-gray-700 font-semibold">${recentlyEdited.price}</div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {recentlyEdited.updatedAt ? new Date(recentlyEdited.updatedAt).toLocaleString() : ''}
              </div>
            </div>
          ) : (
            <div className="text-gray-400">No edits yet</div>
          )}
        </div>
      </div>
    </section>
  );
}