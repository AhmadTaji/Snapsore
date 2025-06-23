
'use client';

import { useEffect, useState } from 'react';
import ProductCard from "../../components/productCard";
import AddProductForm from '../../components/AddProductForm';
import EditProductForm from '../../components/EditProductForm';
import { Pagination } from '../../components/Pagination';

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null); // <-- EDIT STATE
  const [deleteMessage, setDeleteMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [addMessage, setAddMessage] = useState('');
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

  async function handleAdd(product: Omit<Product, '_id'>) {
    const res = await fetch('/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!res.ok) return alert('Failed to add');

    const created = await res.json();
    setProducts((prev) => [...prev, created]);
    setShowAddForm(false);
    setAddMessage('Product added successfully!');
    setTimeout(() => setAddMessage(''), 2000);
  }

  async function handleDelete(id: string) {
    const confirmDelete = confirm('Are you sure?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
    if (!res.ok) return alert('Delete failed');

    setProducts(products.filter((p) => p._id !== id));
    setDeleteMessage('Product deleted successfully');
    setTimeout(() => setDeleteMessage(''), 1500);
  }

  // <-- EDIT HANDLER
  async function handleEdit(updated: Product) {
    const res = await fetch(`/api/product/${updated._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) return alert('Edit failed');
    const newProduct = await res.json();
    setProducts(products.map(p => p._id === newProduct._id ? newProduct : p));
    setEditingProduct(null);
    setEditingProduct(null);
  setUpdateMessage('Product updated successfully!'); // <-- NEW
  setTimeout(() => setUpdateMessage(''), 2000);     
  }

  return (
    <section className="space-y-6">
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
     {addMessage  && (
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded shadow-lg transition-all"
    style={{ minWidth: 200, textAlign: 'center' }}>
    {addMessage}
  </div>
)} 
{updateMessage && (
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded shadow-lg transition-all"
    style={{ minWidth: 200, textAlign: 'center' }}>
    {updateMessage}
  </div>
)}

      {deleteMessage && (
       <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded shadow-lg transition-all"
    style={{ minWidth: 200, textAlign: 'center' }}>
    {deleteMessage}
  </div>
      )}

      {showAddForm && (
        <div className="bg-white border p-6 rounded-md shadow">
          <AddProductForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {/* EDIT FORM */}
      {editingProduct && (
        <div className="bg-white border p-6 rounded-md shadow">
          <EditProductForm
            product={editingProduct}
            onEdit={handleEdit}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-3 gap-10 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-110 w-92 bg-gray-200 rounded-lg mb-2" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {displayed.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={() => setEditingProduct(product)} // <-- SET EDITING PRODUCT
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