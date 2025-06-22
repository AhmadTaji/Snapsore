

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  brand?: string;
};

interface Props {
  products: Product[];
  categories: string[]; // dynamically fetched categories from server (includes "All")
}

export default function ClientProductList({ products, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Filter by category
  let filtered = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  // Filter by search term
  if (search.trim()) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort
  if (sort === 'low-to-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'high-to-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filtered.slice(startIndex, startIndex + productsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-8">
      {/* Filter, Search, Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-4 py-1.5 text-sm rounded-full border transition ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-3 py-2 text-sm rounded-full border focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 text-sm border rounded-full focus:ring-2 focus:ring-black focus:outline-none"
          >
            <option value="">Sort by</option>
            <option value="low-to-high">Price: Low → High</option>
            <option value="high-to-low">Price: High → Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition p-4"
          >
            <Link href={`/products/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-md"
              />
              <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
              <span className="text-blue-600 text-sm mt-2 block">View Details</span>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded border text-sm disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            className={`px-4 py-2 rounded border text-sm ${
              currentPage === i + 1
                ? 'bg-black text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded border text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
