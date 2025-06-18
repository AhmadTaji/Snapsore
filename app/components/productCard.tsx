// components/ProductCard.tsx

import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';


type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  brand: string;
  image: string;
};

type Props = {
  product: Product;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow-md max-w-sm bg-white flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
      <p className="text-lg font-bold mb-2">${product.price.toFixed(2)}</p>
      <p className="text-gray-700 mb-3">{product.description}</p>
      <p className="text-sm text-gray-600 mb-3">Brand: {product.brand}</p>
      <div className="mt-auto flex space-x-3">
        <button
          onClick={() => onEdit(product.id)}
          className="flex items-center text-blue-600 hover:text-blue-800"
          aria-label="Edit product"
        >
          <PencilIcon className="h-5 w-5 mr-1" />
          Edit
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex items-center text-red-600 hover:text-red-800"
          aria-label="Delete product"
        >
          <TrashIcon className="h-5 w-5 mr-1" />
          Delete
        </button>
      </div>
    </div>
  );
}
