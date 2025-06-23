
'use client';

import { LayoutDashboard, Box, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import LogoutButton from '../components/Logout';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { usePathname } from 'next/navigation';

type JwtPayload = { name: string };

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  { label: 'Products', href: '/dashboard/products', icon: <Box size={18} /> },
  { label: 'Analytics', href: '/dashboard/analytics', icon: <BarChart3 size={18} /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [adminName, setAdminName] = useState('Admin');
  const pathname = usePathname();

  useEffect(() => {
    const cookieToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('admin-token='))?.split('=')[1];
    if (cookieToken) {
      try {
        const decoded: JwtPayload = jwtDecode(cookieToken);
        if (decoded?.name) setAdminName(decoded.name);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
     <aside className="w-64 bg-white shadow-lg fixed h-screen flex flex-col z-20">
  {/* User Info */}
  <div className="px-6 pt-6 pb-4 flex items-center gap-4">
    <div className="bg-blue-600 text-white font-semibold rounded-full w-10 h-10 flex items-center justify-center text-lg">
      {adminName?.charAt(0).toUpperCase() || 'A'}
    </div>
    <div className="truncate">
      <p className="text-sm font-medium text-gray-900 truncate">{adminName}</p>
      <p className="text-xs text-gray-500">Administrator</p>
    </div>
  </div>

  {/* Navigation */}
  <nav className="flex-1 px-6 pt-2 space-y-1">
    {navItems.map(({ href, label, icon }) => {
      const isActive = pathname === href;
      return (
        <Link
          key={href}
          href={href}
          className={`group flex items-center gap-3 px-4 py-2.5 rounded-md transition ${
            isActive
              ? 'bg-blue-600 text-white font-semibold shadow'
              : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          <span className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-600'}>
            {icon}
          </span>
          <span className="text-sm">{label}</span>
        </Link>
      );
    })}
  </nav>

  {/* Logout aligned neatly at bottom */}
  <div className="px-6 py-4">
    <LogoutButton />
  </div>
</aside>


      {/* Main Content */}
      {/* <main className="flex-1 ml-64 px-8 py-10 overflow-y-auto">
        {children}
      </main> */}
    <main className="flex-1 ml-64 px-2 py-2 overflow-y-auto">
  {children}
</main>
    </div>
  );
}
