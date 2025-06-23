


// import Image from 'next/image';
// import AddToCartButton from '@/app/components/AddToCardButton';
// import AddToWishlistButton from '@/app/components/AddToWishlistButton';
// import ReviewForm from '@/app/components/ReviewForm';
// import ReviewList from '@/app/components/ReviewList';

// interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   description?: string;
//   brand?: string;
// }

// async function fetchProduct(id: string): Promise<Product> {
//   const res = await fetch(`http://localhost:3000/api/product/${id}`, {
//     cache: 'no-store',
//   });

//   if (!res.ok) throw new Error('Failed to fetch product');

//   return res.json();
// }

// interface Props {
//   params: {
//     id: string;
//   };
// }

// export default async function ProductDetailPage({ params }: Props) {
//   const product = await fetchProduct(params.id);

//   return (
//     <main className="max-w-7xl mx-auto px-2 md:px-6 py-8 md:py-12">
//       {/* Product Info Section */}
//       <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start bg-white shadow-lg rounded-2xl p-4 md:p-8">
//         {/* Product Image */}
//         <div className="md:w-1/2 w-full flex justify-center">
//           <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-md border">
//             <Image
//               src={product.image}
//               alt={product.name}
//               fill
//               className="object-cover"
//               priority
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//           </div>
//         </div>

//         {/* Product Details */}
//         <div className="md:w-1/2 w-full flex flex-col gap-5">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
//           <p className="text-sm text-gray-500 mb-1">Category: <span className="font-medium text-gray-700">{product.category}</span></p>
//           <p className="text-2xl md:text-3xl text-green-600 font-semibold mb-2">${product.price.toFixed(2)}</p>

//           {product.description && (
//             <div>
//               <span className="block text-gray-600 font-semibold mb-1">Description:</span>
//               <p className="text-gray-700 leading-relaxed">{product.description}</p>
//             </div>
//           )}

//           {product.brand && (
//             <p className="text-gray-700">
//               <span className="text-gray-600 font-semibold">Brand:</span> {product.brand}
//             </p>
//           )}

//           <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
//             <AddToCartButton product={product} />
//             {/* <AddToWishlistButton productId={product._id} /> */}
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section: Side by side on desktop, stacked on mobile */}
//       <div className="flex flex-col lg:flex-row gap-8 mt-10 items-start">
//   <div className="lg:w-1/2 w-full">
//     <ReviewForm productId={product._id} />
//   </div>
//   <div className="lg:w-1/2 w-full">
//     <ReviewList productId={product._id} />
//   </div>
// </div>
//     </main>
//   );
// }


import Image from 'next/image';
import AddToCartButton from '@/app/components/AddToCardButton';
import AddToWishlistButton from '@/app/components/AddToWishlistButton';
import ReviewForm from '@/app/components/ReviewForm';
import ReviewList from '@/app/components/ReviewList';

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  brand?: string;
}

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch product');

  return res.json();
}

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await fetchProduct(params.id);

  return (
    <main className="max-w-7xl mx-auto px-2 md:px-6 py-8 md:py-12">
      {/* Product Info Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start bg-white shadow-lg rounded-2xl p-4 md:p-8">
        {/* Product Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <div className="relative w-full max-w-md aspect-[4/3] rounded-xl overflow-hidden shadow-md border">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 w-full flex flex-col gap-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-1">
            Category: <span className="font-medium text-gray-700">{product.category}</span>
          </p>
          <p className="text-2xl md:text-3xl text-green-600 font-semibold mb-2">
            ${product.price.toFixed(2)}
          </p>

          {product.description && (
            <div>
              <span className="block text-gray-600 font-semibold mb-1">Description:</span>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {product.brand && (
            <p className="text-gray-700">
              <span className="text-gray-600 font-semibold">Brand:</span> {product.brand}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
            <AddToCartButton product={product} />
            {/* <AddToWishlistButton productId={product._id} /> */}
          </div>
        </div>
      </div>

      {/* Reviews Section: Side by side on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-8 mt-10 items-stretch">
        <div className="lg:w-1/2 w-full flex flex-col">
          <ReviewForm productId={product._id} />
        </div>
        <div className="lg:w-1/2 w-full flex flex-col">
          <ReviewList productId={product._id} />
        </div>
      </div>
    </main>
  );
}