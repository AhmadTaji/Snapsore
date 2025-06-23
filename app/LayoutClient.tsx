'use client';

import { usePathname } from 'next/navigation';
import Footer from "./components/footer";
import Link from 'next/link';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');
  const isLogin = pathname.startsWith('/login');

  return (
    <>
      {(!isDashboard && !isLogin) && <Header />}
      <main className="min-h-[80vh]">{children}</main>
      {(!isDashboard && !isLogin) && <Footer />}
    </>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm">
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