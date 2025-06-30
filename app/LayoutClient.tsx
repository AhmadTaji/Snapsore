

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Footer from "./components/footer";
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';
import { User } from 'lucide-react';


type JwtPayload = {
  name?: string; // optional in case not present
};

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
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // loading state
  //

useEffect(() => {
  const loadUser = () => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded?.name) {
          setUserName(decoded.name);
        }
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }
    setIsLoading(false);
  };

  loadUser();

  // ✅ Listen for login event
  document.addEventListener('user-logged-in', loadUser);

  return () => {
    document.removeEventListener('user-logged-in', loadUser);
  };
}, []);

  //

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded?.name) {
          setUserName(decoded.name);
        }
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }

    setIsLoading(false); // done checking
  }, []);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-black">
          SnapStore
        </Link>

        <nav className="space-x-6 flex items-center">
          <Link href="/" className="text-xl text-gray-700 hover:text-black">Home</Link>
          <Link href="/products" className="text-xl text-gray-700 hover:text-black">Products</Link>
          <Link href="/wishlist" className="text-xl text-gray-700 hover:text-black">Wishlist</Link>
          <Link href="/cart" className="text-xl text-gray-700 hover:text-black">Cart</Link>
          <nav className="space-x-6 flex items-center">
  ...
  {isLoading ? null : (
    userName ? (
      // <Link href="/profile" className="text-xl text-gray-700 hover:text-black">
      // {/* <span className="text-xl font-semibold text-blue-600">Hi, {userName}</span> */}
      // </Link>
      <Link href="/profile" className="flex items-center gap-2 text-xl text-gray-700 hover:text-black">
  
  <span className="font-semibold text-blue-600">Hi, {userName}</span>
  <User className="w-5 h-5 text-blue-600" />
</Link>

    ) : (
      <>
        <Link href="/signup" className="text-xl text-gray-700 hover:text-black">Sign up</Link>
        <Link href="/signin" className="text-xl text-gray-700 hover:text-black">Sign in</Link>
      </>
    )
  )}
</nav>

        </nav>
      </div>
    </header>
  );
}
