import Image from 'next/image'; // Next.js optimized Image component
import AddToCartButton from '@/app/components/AddToCardButton'; // Custom add to cart button component
import AddToWishlistButton from '@/app/components/AddToWishlistButton';

// Define the shape of a review object
interface Review {
  id: number;
  name: string;
  rating: number; // Rating from 1 to 5
  comment: string;
}

// Define the shape of a product object
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string; // Optional product description
  brand?: string;       // Optional brand name
}

// Function to fetch reviews for a specific product by ID
async function fetchReviews(id: string): Promise<Review[]> {
  // Fetch from API endpoint with cache disabled to always get fresh data
  const res = await fetch(`http://localhost:3000/api/reviews/${id}`, {
    cache: 'no-store',
  });

  // If API response is not OK, return an empty array
  if (!res.ok) return [];

  // Return parsed JSON (assumed to be an array of Review)
  return res.json();
}

// Function to fetch product details by ID
async function fetchProduct(id: string): Promise<Product> {
  // Fetch product data from API endpoint with cache disabled
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: 'no-store',
  });

  // If fetch fails, throw an error (to handle upstream)
  if (!res.ok) throw new Error('Failed to fetch product');

  // Return parsed JSON (assumed to be a Product object)
  return res.json();
}

// Props expected by this page component
interface Props {
  params: {
    id: string; // Product ID from dynamic route
  };
}

// React Server Component to show product details and reviews
export default async function ProductDetailPage({ params }: Props) {
  // Fetch product details using the product ID from route params
  const product = await fetchProduct(params.id);

  // Fetch reviews for the product by ID
  const reviews = await fetchReviews(params.id);

  return (
    <main className="max-w-6xl mx-auto p-6 mt-12 space-y-12">
      {/* Product Info Section */}
      <div className="flex flex-col md:flex-row gap-10 items-start bg-white shadow-md rounded-lg p-6">
        {/* Product Image */}
        <div className="md:w-1/2 w-full">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow">
            <Image
              src={product.image}        // Product image URL
              alt={product.name}         // Alt text for accessibility
              fill                       // Fill the container (object-fit: cover)
              className="object-cover"   // Cover the container area
              priority                   // High loading priority for above-the-fold image
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          {/* Price with two decimals */}
          <p className="text-2xl text-green-600 font-semibold">${product.price.toFixed(2)}</p>

          {/* Conditionally render product description if available */}
          {product.description && (
            <p className="text-gray-700 leading-relaxed">
              <strong className="block mb-1 text-gray-600">Description:</strong>
              {product.description}
            </p>
          )}

          {/* Conditionally render brand info if available */}
          {product.brand && (
            <p className="text-gray-700">
              <strong className="text-gray-600">Brand:</strong> {product.brand}
            </p>
          )}

          {/* Add to Cart button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-4">
  <AddToCartButton product={product} />
  <AddToWishlistButton productId={product.id} />
</div>

        </div>
      </div>

      {/* Review Section */}
      <section className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">📝 Customer Reviews</h2>

        {/* Show message if no reviews */}
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet for this product.</p>
        ) : (
          // Grid layout for reviews, 2 columns on md screens
          <div className="grid md:grid-cols-2 gap-6">
            {/* Map over each review and display */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border p-5 rounded-xl bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2">
                  {/* Reviewer name */}
                  <span className="text-lg font-medium text-gray-700">{review.name}</span>

                  {/* Display star rating */}
                  <div className="flex gap-1 text-yellow-500 text-sm">
                    {Array.from({ length: 5 }).map((_, i) => (
                      // Show filled star if index < rating else empty star
                      <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>

                {/* Review comment */}
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
