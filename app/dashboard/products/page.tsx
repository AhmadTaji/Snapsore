
'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/app/components/productCard';
import AddProductForm from '../../components/AddProductForm';
import { Pagination } from '../../components/Pagination';

const PAGE_SIZE = 6;

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  brand: string;
  image: string;
};

type ProductFormData = {
  name: string;
  category: string;
  price: string;
  description: string;
  brand: string;
  imageUrl: string;
  imageFile?: File | null;
};

export default function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products'); // Adjust URL if needed
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const displayedProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  async function handleAdd(productData: ProductFormData) {
  const newProduct = {
    name: productData.name,
    category: productData.category,
    price: productData.price,
    description: productData.description,
    brand: productData.brand,
    image: productData.imageUrl || '/images/default.png',
  };

  try {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (!res.ok) throw new Error('Failed to add product');

    const created = await res.json();
    setProducts((prev) => [...prev, created]);
    setShowAddForm(false);
  } catch (err) {
    console.error('Add failed:', err);
    alert('Failed to add product.');
  }
}


 //han

// async function handleDelete(id: number) {
//   const confirmDelete = confirm('Are you sure you want to delete this product?');
//   if (!confirmDelete) return;

//   try {
//     const res = await fetch(`/api/products/${id}`, {
//       method: 'DELETE',
//     });

//     if (!res.ok) throw new Error('Failed to delete product');

//     setProducts(products.filter((p) => p.id !== id));
//   } catch (err) {
//     console.error('Error deleting product:', err);
//     alert('Failed to delete product.');
//   }
// }
async function handleDelete(id: number) {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (!confirmDelete) return;

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Failed to delete product');

    setProducts(products.filter((p) => p.id !== id));
  } catch (err) {
    console.error('Error deleting product:', err);
    alert('Failed to delete product.');
  }
}


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>

      {showAddForm && (
        <AddProductForm
          onAdd={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => alert('Edit functionality coming soon!')}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
