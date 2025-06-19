
// // import React from 'react';

// // async function fetchProducts() {
// //   const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
// //   if (!res.ok) throw new Error('Failed to fetch products');
// //   return res.json();
// // }

// // export default async function DashboardHome() {
// //   const products = await fetchProducts();

// //   return (
// //     <div className="space-y-4">
// //       <h1 className="text-3xl font-bold">📊 Dashboard 📊 </h1>
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //         <div className="bg-white shadow rounded p-6">
// //           <h2 className="text-lg font-semibold mb-2">Total Products</h2>
// //           <p className="text-2xl font-bold text-blue-600">{products.length}</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client';

// import { useState, useEffect } from 'react';
// import ProductCard from '../../app/components/productCard'; // Your product card component
// import AddProductForm from '@/app/components/AddProductForm'; // Your add product form component
// import { Pagination } from '@/app/components/Pagination'; // Your pagination component

// const PAGE_SIZE = 6;

// type Product = {
//   _id: string;  // MongoDB uses _id
//   name: string;
//   category: string;
//   price: number;
//   description: string;
//   brand: string;
//   image: string;
// };

// export default function DashboardProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   async function fetchProducts() {
//     try {
//       const res = await fetch('/api/product');
//       if (!res.ok) throw new Error('Failed to fetch products');
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error(error);
//       alert('Error loading products');
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleAdd(productData: Omit<Product, '_id'>) {
//     try {
//       const res = await fetch('/api/product', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(productData),
//       });
//       if (!res.ok) throw new Error('Failed to add product');
//       const newProduct = await res.json();
//       setProducts((prev) => [...prev, newProduct]);
//       setShowAddForm(false);
//     } catch (error) {
//       console.error(error);
//       alert('Failed to add product');
//     }
//   }

//   async function handleDelete(id: string) {
//     if (!confirm('Are you sure you want to delete this product?')) return;

//     try {
//       const res = await fetch(`/api/product/${id}`, {
//         method: 'DELETE',
//       });
//       if (!res.ok) throw new Error('Failed to delete product');
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (error) {
//       console.error(error);
//       alert('Failed to delete product');
//     }
//   }

//   const totalPages = Math.ceil(products.length / PAGE_SIZE);
//   const displayedProducts = products.slice(
//     (currentPage - 1) * PAGE_SIZE,
//     currentPage * PAGE_SIZE
//   );

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Manage Products</h1>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
//         >
//           Add Product
//         </button>
//       </div>

//       {showAddForm && (
//         <AddProductForm
//           onAdd={handleAdd}
//           onCancel={() => setShowAddForm(false)}
//         />
//       )}

//       {loading ? (
//         <p>Loading products...</p>
//       ) : (
//         <>
//           {products.length === 0 ? (
//             <p>No products found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//               {displayedProducts.map((product) => (
//                 <ProductCard
//                   key={product._id}
//                   product={product}
//                   onEdit={() => alert('Edit coming soon!')}
//                   onDelete={() => handleDelete(product._id)}
//                 />
//               ))}
//             </div>
//           )}

//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }


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
