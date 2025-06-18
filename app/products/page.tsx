
import ClientProductList from './ClientProductList';

async function fetchProducts() {
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
export default async function ProductPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
      <ClientProductList products={products} />
    </main>
  );
}


