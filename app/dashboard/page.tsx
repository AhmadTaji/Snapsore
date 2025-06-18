
import React from 'react';

async function fetchProducts() {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function DashboardHome() {
  const products = await fetchProducts();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">📊 Dashboard 📊 </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-2xl font-bold text-blue-600">{products.length}</p>
        </div>
      </div>
    </div>
  );
}
