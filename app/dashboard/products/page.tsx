// // app/dashboard/products/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
// }

// export default function ProductManager() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const res = await fetch('/api/products');
//       const data = await res.json();
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">🛒 Manage Products</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {products.map(product => (
//           <div
//             key={product.id}
//             className="p-4 border rounded shadow-sm flex flex-col md:flex-row items-center gap-4"
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-24 h-24 object-cover rounded"
//             />
//             <div className="flex-1">
//               <h2 className="text-xl font-semibold">{product.name}</h2>
//               <p className="text-sm text-gray-600">{product.category}</p>
//               <p className="text-green-600 font-bold">${product.price}</p>
//             </div>
//             <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function ProductsPage() {
  return <h1>Manage Products</h1>;
}
