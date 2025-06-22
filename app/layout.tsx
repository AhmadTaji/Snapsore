// app/layout.tsx
import {CartProvider} from "./context/cardContext"
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from "./components/footer";
import { WishlistProvider } from './context/wishlistContext';

export const metadata: Metadata = {
  title: 'SnapStore',
  description: 'Modern online tech store built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
       
          <WishlistProvider>
        <CartProvider>
          <Header />
          <main className="min-h-[80vh]">{children}</main>
          <Footer />
        </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}

// Header Component
function Header() {
  return (
    <header className="bg-white  shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black">
          SnapStore
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="text-xl text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="/products" className="text-xl text-gray-700 hover:text-black">
            Products
          </Link>
          <Link href="/wishlist" className="text-xl text-gray-700 hover:text-black">
            Wishlist
          </Link>
          <Link href="/cart" className="text-xl text-gray-700 hover:text-black">
            Cart
          </Link>
          <Link href="/signup" className="text-xl text-gray-700 hover:text-black">
            sign up
          </Link>
          <Link href="/signin" className="text-xl text-gray-700 hover:text-black">
            sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}


