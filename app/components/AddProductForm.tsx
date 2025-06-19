
// 'use client';

// import React, { useState } from 'react';

// type ProductFormData = {
//   name: string;
//   category: string;
//   price: string;
//   description: string;
//   brand: string;
// };

// type Props = {
//   onAdd: (productData: ProductFormData, imageFile: File | null) => void;
//   onCancel: () => void;
// };

// export default function AddProductForm({ onAdd, onCancel }: Props) {
//   const [formData, setFormData] = useState<ProductFormData>({
//     name: '',
//     category: '',
//     price: '',
//     description: '',
//     brand: '',
//   });

//   const [imageFile, setImageFile] = useState<File | null>(null);

//   function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   }

//   function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
//     if (e.target.files && e.target.files.length > 0) {
//       setImageFile(e.target.files[0]);
//     }
//   }

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     onAdd(formData, imageFile);
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-xl mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-lg space-y-6"
//     >
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">🛍️ Add New Product</h2>

//       {/* Name */}
//       <div>
//         <label className="block mb-1 text-gray-700 font-medium">Product Name</label>
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           placeholder="E.g., iPhone 14 Pro"
//         />
//       </div>

//       {/* Category */}
//       <div>
//         <label className="block mb-1 text-gray-700 font-medium">Category</label>
//         <input
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           required
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           placeholder="E.g., Electronics"
//         />
//       </div>

//       {/* Price */}
//       <div>
//         <label className="block mb-1 text-gray-700 font-medium">Price ($)</label>
//         <input
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           required
//           type="number"
//           step="0.01"
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           placeholder="E.g., 999.99"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="block mb-1 text-gray-700 font-medium">Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           rows={4}
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           placeholder="Enter a short product description"
//         />
//       </div>

//       {/* Brand */}
//       <div>
//         <label className="block mb-1 text-gray-700 font-medium">Brand</label>
//         <input
//           name="brand"
//           value={formData.brand}
//           onChange={handleChange}
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//           placeholder="E.g., Apple"
//         />
//       </div>

//       {/* Image Upload */}
//       <div>
//         <label className="block mb-1 text-gray-700 font-medium">Product Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileChange}
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
//         />
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-end gap-4 pt-4">
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
//         >
//           Cancel
//         </button>

//         <button
//           type="submit"
//           className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
//         >
//           Add Product
//         </button>
//       </div>
//     </form>
//   );
// }
'use client';

import React, { useState } from 'react';

type ProductFormData = {
  name: string;
  category: string;
  price: string;
  description: string;
  brand: string;
  imageUrl: string; // added for remote images
};

type Props = {
  onAdd: (productData: ProductFormData, imageFile: File | null) => void;
  onCancel: () => void;
};

export default function AddProductForm({ onAdd, onCancel }: Props) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    price: '',
    description: '',
    brand: '',
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(formData, imageFile); // Send both: URL + File (API will choose which one to use)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white border border-gray-200 p-6 rounded-2xl shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🛍️ Add New Product</h2>

      {/* Name */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Product Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="E.g., iPhone 14 Pro"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="E.g., Electronics"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Price ($)</label>
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          step="0.01"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="E.g., 999.99"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Product details here..."
        />
      </div>

      {/* Brand */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Brand</label>
        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="E.g., Apple"
        />
      </div>

      {/* Image from URL */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Image URL (optional)</label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Image from Local File */}
      <div>
        <label className="block mb-1 text-gray-700 font-medium">Upload Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
