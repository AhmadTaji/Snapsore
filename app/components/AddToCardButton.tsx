'use client';

import { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react'; // Icons
import { useCart } from '../context/cardContext';
import { products } from '../../utils/products';

interface Props {
  product: products;
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart, removeFromCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleToggleCart = () => {
    if (added) {
      removeFromCart(product.id);
      setAdded(false);
    } else {
      addToCart(product);
      setAdded(true);
    }
  };

  return (
    <button
      onClick={handleToggleCart}
      className={`w-full px-4 py-2 mt-2 border rounded-lg flex items-center justify-center gap-2
        ${added
          ? 'bg-red-50 text-red-600 border-red-600 hover:bg-red-100'
          : 'bg-white hover:bg-blue-100 text-blue-600 border-blue-600'}
        transition shadow-sm`}
    >
      {added ? <X className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
      {added ? 'Remove from Cart' : 'Add to Cart'}
    </button>
  );
}
