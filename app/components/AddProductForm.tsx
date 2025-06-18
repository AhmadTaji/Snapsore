'use client';
import { useState, ChangeEvent, FormEvent } from 'react';

type ProductFormData = {
  name: string;
  category: string;
  price: string;
  description: string;
  brand: string;
  imageUrl: string;
  imageFile?: File | null;
};

const categories = ['Accessories', 'Electronics', 'Fashion', 'Home'];

type Props = {
  onAdd: (data: ProductFormData) => void;
  onCancel: () => void;
};

export default function AddProductForm({ onAdd, onCancel }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    name: '',
    category: '',
    price: '',
    description: '',
    brand: '',
    imageUrl: '',
    imageFile: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'imageFile') {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        setForm((f) => ({ ...f, imageFile: target.files![0] }));
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { name, category, price, description, brand } = form;

    if (!name || !category || !price || !description || !brand) {
      alert('Please fill all required fields.');
      return;
    }

    onAdd(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4"
    >
      <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

      <div>
        <label className="block mb-1 font-medium">Product Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Price ($)</label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Brand</label>
        <input
          name="brand"
          type="text"
          value={form.brand}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image URL</label>
        <input
          name="imageUrl"
          type="text"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          placeholder="Enter image URL"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Or Upload Image</label>
        <input
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
