

"use client";
import { useState, useEffect, use } from 'react';
import AddProductForm from "../../app/components/AddProductForm"; // Adjust the import path as necessary
import ProductCard from '@/app/components/productCard';
import { Pagination } from "../../app/components/Pagination"; // Adjust the import path as necessary

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  brand?: string;
  image: string;
};

export default function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch('/api/product');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  async function handleAdd(productData: Omit<Product, '_id'>, imageFile: File | null) {
    let imageUrl = '';

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        alert('Image upload failed');
        return;
      }

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    const productToSend = {
      ...productData,
      image: imageUrl || '/images/default.png',
    };

    const res = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToSend),
    });

    if (!res.ok) {
      alert('Failed to add product');
      return;
    }

    const newProduct = await res.json();
    setProducts((prev) => [...prev, newProduct]);
    setShowAddForm(false);
  }

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const displayedProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>

      {showAddForm && <AddProductForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={() => alert('Edit functionality coming soon!')}
                onDelete={(id) => {
                  // implement delete function here
                }}
              />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </div>
  );
}
