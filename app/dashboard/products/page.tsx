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
  createdAt?: string;
  updatedAt?: string;
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [addMessage, setAddMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
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

  // Dynamic categories
  const categories = Array.from(new Set(products.map(p => p.category))).sort();
  categories.unshift('All');

  // Filter, search, sort
  let filtered = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  if (search.trim()) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === 'low-to-high') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === 'high-to-low') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const displayed = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // async function handleAdd(product: Omit<Product, '_id'>) {
  //   const res = await fetch('/api/product', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(product),
  //   });
  //   if (!res.ok) return alert('Failed to add');

  //   const created = await res.json();
  //   setProducts((prev) => [...prev, created]);
  //   setShowAddForm(false);
  //   setAddMessage('Product added successfully!');
  //   setTimeout(() => setAddMessage(''), 2000);
  // }
  async function handleAdd(formData: any, imageFile: File | null) {
  let image = formData.imageUrl || '';

  // If a file is selected, upload it first
  if (imageFile) {
    const uploadData = new FormData();
    uploadData.append('file', imageFile);

    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: uploadData,
    });

    if (!uploadRes.ok) {
      alert('Image upload failed');
      return;
    }

    const uploadJson = await uploadRes.json();
    image = uploadJson.url;
  }

  // Prepare product data
  const product = {
    ...formData,
    price: parseFloat(formData.price),
    image,
  };
  delete product.imageUrl;

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
    setDeleteMessage('Product deleted successfully!');
    setTimeout(() => setDeleteMessage(''), 1500);
  }

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
    setUpdateMessage('Product updated successfully!');
    setTimeout(() => setUpdateMessage(''), 2000);
  }

  return (
    <section className="space-y-6 mt-2 px-2">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-sm text-gray-500">Add, edit, or remove your items</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </header>

      {/* Filter/Search/Sort UI */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 text-sm rounded-full border transition ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-3 pr-3 py-2 text-sm rounded-full border focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm border rounded-full focus:ring-2 focus:ring-black focus:outline-none"
          >
            <option value="">Sort by</option>
            <option value="low-to-high">Price: Low → High</option>
            <option value="high-to-low">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Success Messages */}
      {addMessage && (
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

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white border p-6 rounded-md shadow">
          <AddProductForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
        </div>
      )}

      {/* Edit Form */}
      {editingProduct && (
        <div className="bg-white border p-6 rounded-md shadow">
          <EditProductForm
            product={editingProduct}
            onEdit={handleEdit}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 w-full bg-gray-200 rounded-lg mb-2" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {displayed.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={() => setEditingProduct(product)}
                onDelete={() => handleDelete(product._id)}
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