
'use client';

import { useEffect, useState } from 'react';
import ProductCard from "../../components/productCard"
import AddProductForm from '../../components/AddProductForm';
import { Pagination } from '../../components/Pagination';
import LoadingSpinner from '../../components/loadingSpinner';


// Example Product type
type Product = {
  _id: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
    const [itemLoading,setItemLoading]=useState("Items");
    const [deleteMessage, setDeleteMessage] = useState(''); // <-- NEW
  const PAGE_SIZE = 6;

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

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const displayed = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  async function handleAdd(product: Omit<Product, 'id'>) {
    const res = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) return alert('Failed to add');

    const created = await res.json();
    setProducts((prev) => [...prev, created]);
    setShowAddForm(false);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm('Are you sure?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
    if (!res.ok) return alert('Delete failed');

    setProducts(products.filter((p) => p._id !== id));
     setDeleteMessage('Deleted!'); // <-- NEW
  setTimeout(() => setDeleteMessage(''), 1500); // <-- NEW
  }

  return (
    <section className="space-y-6">
      {deleteMessage && (
        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
          {deleteMessage}
        </div>
      )}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-sm text-gray-500">Add, edit, or remove your items</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 mr-23 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </header>

      {showAddForm && (
        <div className="bg-white border p-6 rounded-md shadow">
          <AddProductForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {loading ? (
          <div className="grid grid-cols-3 gap-10 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-110 w-92 bg-gray-200 rounded-lg mb-2" />
            ))}
          </div>
        )  : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            
            {displayed.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={() => alert('Edit feature coming soon')}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </>
      )}
    </section>
  );
}


