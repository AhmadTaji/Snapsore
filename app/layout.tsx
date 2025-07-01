

import { CartProvider } from "./context/cardContext";
import './globals.css';
import type { Metadata } from 'next';
import { WishlistProvider } from './context/wishlistContext';
import LayoutClient from './LayoutClient';

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
            <LayoutClient>{children}</LayoutClient>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}