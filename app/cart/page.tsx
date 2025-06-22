// 'use client';

// import Image from 'next/image';
// import { useCart } from '../context/cardContext';

// function CartItem({
//   item,
//   onRemove,
// }: {
//   item: {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     quantity: number;
//   };
//   onRemove: (id: number) => void;
// }) {
//   return (
//     <div className="flex items-center space-x-4 border-b py-4">
//       <Image src={item.image} alt={item.name} width={80} height={60} className="rounded" />
//       <div className="flex-1">
//         <p className="font-bold">{item.name}</p>
//         <p>Price: ${item.price.toFixed(2)}</p>
//         <p>Quantity: {item.quantity}</p>
//       </div>
//       <button
//         onClick={() => onRemove(item.id)}
//         className="text-red-500 hover:underline"
//       >
//         Remove
//       </button>
//     </div>
//   );
// }

// export default function CartPage() {
//   const { cart, removeFromCart, clearCart } = useCart();

//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   if (cart.length === 0) {
//     return (
//       <main className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow text-center">
//         <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//         <p>Your cart is empty.</p>
//       </main>
//     );
//   }

//   return (
//     <main className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
//       <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

//       {cart.map(item => (
//         <CartItem key={item.id} item={item} onRemove={removeFromCart} />
//       ))}

//       <div className="text-right mt-6 font-semibold text-xl">
//         Total: ${totalPrice.toFixed(2)}
//       </div>

//       <div className="text-right mt-4">
//         <button
//           onClick={clearCart}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Clear Cart
//         </button>
//       </div>
//     </main>
//   );
// }
'use client';

import { useCart } from "../context/cardContext";
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. <Link href="/products" className="text-blue-600 underline">Browse products</Link>.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex items-center space-x-6 border-b py-4">
              <Image src={item.image} alt={item.name} width={80} height={60} className="rounded" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
