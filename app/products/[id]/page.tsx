
import Image from 'next/image';
import AddToCartButton from '@/app/components/AddToCardButton';
import AddToWishlistButton from '@/app/components/AddToWishlistButton';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  brand?: string;
}

// Fetch product details by ID
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
    <main className="max-w-6xl mx-auto p-6 mt-12 space-y-12">
      {/* Product Info Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start bg-white shadow-md rounded-lg p-6">
        {/* Product Image */}
        <div className="md:w-1/2 w-full">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-2xl text-green-600 font-semibold">${product.price.toFixed(2)}</p>

          {product.description && (
            <p className="text-gray-700 leading-relaxed">
              <strong className="block mb-1 text-gray-600">Description:</strong>
              {product.description}
            </p>
          )}

          {product.brand && (
            <p className="text-gray-700">
              <strong className="text-gray-600">Brand:</strong> {product.brand}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
            <AddToCartButton product={product} />
            <AddToWishlistButton productId={product.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
