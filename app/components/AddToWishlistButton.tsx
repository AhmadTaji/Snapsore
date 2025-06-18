// 'use client';

// import { useEffect, useState } from 'react';
// import { Heart } from 'lucide-react';

// export default function AddToWishlistButton({ productId }: { productId: number }) {
//   const [added, setAdded] = useState(false);

//   // Check localStorage on mount
//   useEffect(() => {
//     const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
//     setAdded(wishlist.includes(productId));
//   }, [productId]);

//   // Toggle add/remove from wishlist
//   const handleToggleWishlist = () => {
//     let wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

//     if (wishlist.includes(productId)) {
//       wishlist = wishlist.filter(id => id !== productId);
//       setAdded(false);
//     } else {
//       wishlist.push(productId);
//       setAdded(true);
//     }

//     localStorage.setItem('wishlist', JSON.stringify(wishlist));
//   };

//   return (
//     <button
//       onClick={handleToggleWishlist}
//       className={`w-full mt-2 px-4 py-2 border rounded-lg flex items-center justify-center gap-2
//         ${added ? 'bg-red-100 text-red-600 border-red-600' : 'bg-white hover:bg-green-100 text-green-600 border-green-600'}
//         transition shadow-sm`}
//     >
//       <Heart className={`w-5 h-5 ${added ? 'fill-current text-red-600' : ''}`} />
//       {added ? 'Remove from Wishlist' : 'Add to Wishlist'}
//     </button>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

export default function AddToWishlistButton({ productId }: { productId: number }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setAdded(Array.isArray(wishlist) && wishlist.includes(productId));
    } catch {
      setAdded(false);
    }
  }, [productId]);

  const handleToggleWishlist = () => {
    try {
      let wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

      if (!Array.isArray(wishlist)) wishlist = [];

      if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        setAdded(false);
      } else {
        wishlist.push(productId);
        setAdded(true);
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch {
      // Fallback: initialize wishlist with current product
      localStorage.setItem('wishlist', JSON.stringify([productId]));
      setAdded(true);
    }
  };

  return (
    <button
      onClick={handleToggleWishlist}
      className={`w-full mt-2 px-4 py-2 border rounded-lg flex items-center justify-center gap-2
        ${added ? 'bg-red-100 text-red-600 border-red-600' : 'bg-white hover:bg-green-100 text-green-600 border-green-600'}
        transition shadow-sm`}
      aria-pressed={added}
      aria-label={added ? 'Remove from wishlist' : 'Add to wishlist'}
      data-productid={productId}
    >
      <Heart className={`w-5 h-5 ${added ? 'fill-current text-red-600' : ''}`} />
      {added ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  );
}
