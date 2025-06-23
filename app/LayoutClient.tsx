

// 'use client';

// import { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Footer from "./components/footer";
// import Link from 'next/link';
// import { jwtDecode } from 'jwt-decode';

// type JwtPayload = {
//   name: string;
// };

// export default function LayoutClient({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const isDashboard = pathname.startsWith('/dashboard');
//   const isLogin = pathname.startsWith('/login');

//   return (
//     <>
//       {(!isDashboard && !isLogin) && <Header />}
//       <main className="min-h-[80vh]">{children}</main>
//       {(!isDashboard && !isLogin) && <Footer />}
//     </>
//   );
// }

// function Header() {
//   const [userName, setUserName] = useState<string | null>(null);
//   const [checkedAuth, setCheckedAuth] = useState(false);

//   useEffect(() => {
//     const token = document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('token='))
//       ?.split('=')[1];

//     if (token) {
//       try {
//         const decoded: JwtPayload = jwtDecode(token);
//         setUserName(decoded.name);
//       } catch (err) {
//         console.error('Token decode error:', err);
//       }
//     }

//     setCheckedAuth(true); // Only now we render
//   }, []);

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
//         <Link href="/" className="text-2xl font-bold text-black">
//           SnapStore
//         </Link>

//         <nav className="space-x-6 flex items-center">
//           <Link href="/" className="text-xl text-gray-700 hover:text-black">
//             Home
//           </Link>
//           <Link href="/products" className="text-xl text-gray-700 hover:text-black">
//             Products
//           </Link>
//           <Link href="/wishlist" className="text-xl text-gray-700 hover:text-black">
//             Wishlist
//           </Link>
//           <Link href="/cart" className="text-xl text-gray-700 hover:text-black">
//             Cart
//           </Link>

//           {/* ✅ Show only after auth check */}
//           {checkedAuth && (
//             userName ? (
//               <span className="text-xl font-semibold text-blue-600">Hi, {userName}</span>
//             ) : (
//               <>
//                 <Link href="/signup" className="text-xl text-gray-700 hover:text-black">
//                   Sign up
//                 </Link>
//                 <Link href="/signin" className="text-xl text-gray-700 hover:text-black">
//                   Sign in
//                 </Link>
//               </>
//             )
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { usePathname } from 'next/navigation';
// import Footer from "./components/footer";
// import Link from 'next/link';
// import { jwtDecode } from 'jwt-decode';

// type JwtPayload = {
//   name?: string; // optional in case not present
// };

// export default function LayoutClient({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const isDashboard = pathname.startsWith('/dashboard');
//   const isLogin = pathname.startsWith('/login');

//   return (
//     <>
//       {(!isDashboard && !isLogin) && <Header />}
//       <main className="min-h-[80vh]">{children}</main>
//       {(!isDashboard && !isLogin) && <Footer />}
//     </>
//   );
// }

// function Header() {
//   const [userName, setUserName] = useState<string | null>(null);
//   const [checkedAuth, setCheckedAuth] = useState(false);

//   useEffect(() => {
//     const token = document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('token='))
//       ?.split('=')[1];

//     if (token) {
//       try {
//         const decoded: JwtPayload = jwtDecode(token);
//         console.log("Decoded token:", decoded);
//         if (decoded?.name) {
//           setUserName(decoded.name);
//         } else {
//           setUserName(null);
//         }
//       } catch (err) {
//         console.error('Token decode error:', err);
//         setUserName(null); // fallback
//       }
//     } else {
//       console.warn("No token found.");
//       setUserName(null);
//     }

//     setCheckedAuth(true);
//   }, []);

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-between">
//         <Link href="/" className="text-2xl font-bold text-black">
//           SnapStore
//         </Link>

//         <nav className="space-x-6 flex items-center">
//           <Link href="/" className="text-xl text-gray-700 hover:text-black">
//             Home
//           </Link>
//           <Link href="/products" className="text-xl text-gray-700 hover:text-black">
//             Products
//           </Link>
//           <Link href="/wishlist" className="text-xl text-gray-700 hover:text-black">
//             Wishlist
//           </Link>
//           <Link href="/cart" className="text-xl text-gray-700 hover:text-black">
//             Cart
//           </Link>

//           {checkedAuth && (
//             userName ? (
//               <span className="text-xl font-semibold text-blue-600">Hi, {userName}</span>
//             ) : (
//               <>
//                 <Link href="/signup" className="text-xl text-gray-700 hover:text-black">
//                   Sign up
//                 </Link>
//                 <Link href="/signin" className="text-xl text-gray-700 hover:text-black">
//                   Sign in
//                 </Link>
//               </>
//             )
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Footer from "./components/footer";
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';

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

          {/* {isLoading ? null : (
            userName ? (
              <span className="text-xl font-semibold text-blue-600">Hi, {userName}</span>
            ) : (
              <>
                <Link href="/signup" className="text-xl text-gray-700 hover:text-black">Sign up</Link>
                <Link href="/signin" className="text-xl text-gray-700 hover:text-black">Sign in</Link>
              </>
            )
          )} */}
          <nav className="space-x-6 flex items-center">
  ...
  {isLoading ? null : (
    userName ? (
      <span className="text-xl font-semibold text-blue-600">Hi, {userName}</span>
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
