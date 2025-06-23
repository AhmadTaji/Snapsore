

// 'use client';
// import { useState, useEffect } from 'react';
// import ProductCard from "../../components/productCard"
// import AddProductForm from '../../components/AddProductForm';
// import { Pagination } from '../../components/Pagination';
// // import { Product } from '; // optional type extraction

// const PAGE_SIZE = 6;

// export default function DashboardProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showAddForm, setShowAddForm] = useState(false);


//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await fetch('/api/products');
//         const data = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error('Failed to fetch products:', err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, []);

//   const totalPages = Math.ceil(products.length / PAGE_SIZE);
//   const displayedProducts = products.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE
//   );

//   async function handleAdd(productData: any) {
//     try {
//       const res = await fetch('/api/products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData),
//       });
//       if (!res.ok) throw new Error('Failed to add product');

//       const created = await res.json();
//       setProducts((prev) => [...prev, created]);
//       setShowAddForm(false);
//     } catch (err) {
//       alert('Failed to add product.');
//     }
//   }

//   async function handleDelete(id: number) {
//     if (!confirm('Are you sure?')) return;

//     try {
//       const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
//       if (!res.ok) throw new Error('Failed to delete');

//       setProducts(products.filter((p) => p.id !== id));
//     } catch (err) {
//       alert('Delete failed.');
//     }
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-7xl mx-auto space-y-6">
//         <div className="flex justify-between items-start">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
//             <p className="text-sm text-gray-500 mt-1">Add, edit or remove your listings</p>
//           </div>
//           <button
//             onClick={() => setShowAddForm(true)}
//             className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md shadow-md"
//           >
//             Add Product
//           </button>
//         </div>

//         {showAddForm && (
//           <div className="bg-white shadow rounded-md p-6 border">
//             <AddProductForm onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
//           </div>
//         )}

//         {loading ? (
//           <div className="grid grid-cols-3 gap-6 animate-pulse">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="h-80 bg-gray-200 rounded-lg" />
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {displayedProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onEdit={() => alert('Edit feature coming soon')}
//                   onDelete={handleDelete}
//                 />
//               ))}
//             </div>
//             <div className="mt-8 flex justify-center">
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={setCurrentPage}
//               />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import ProductCard from "../../components/productCard"
import AddProductForm from '../../components/AddProductForm';
import { Pagination } from '../../components/Pagination';
import LoadingSpinner from '../../components/loadingSpinner';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
    const [itemLoading,setItemLoading]=useState("Items");
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

  async function handleDelete(id: number) {
    const confirmDelete = confirm('Are you sure?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
    if (!res.ok) return alert('Delete failed');

    setProducts(products.filter((p) => p.id !== id));
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
                key={product.id}
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


