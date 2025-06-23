
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, rating, comment }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    setIsError(!res.ok);
    if (res.ok) {
      setComment('');
      setRating(5);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Leave a Review</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 && 's'}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="border border-gray-300 p-2 w-full rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
            placeholder="Share your experience..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition shadow mt-2"
        >
          Submit Review
        </button>
        {message && (
          <div
            className={`text-sm mt-2 p-3 rounded flex items-center gap-2 border ${
              isError
                ? 'text-red-700 bg-red-50 border-red-200'
                : 'text-green-700 bg-green-50 border-green-200'
            }`}
          >
            <span>
              {message}
              {isError && message.toLowerCase().includes('sign in') && (
                <span>
                  {' '}
                  <Link href="/signin" className="text-blue-600 underline font-semibold">Sign In</Link>
                  {' or '}
                  <Link href="/signup" className="text-blue-600 underline font-semibold">Sign Up</Link>
                </span>
              )}
            </span>
          </div>
        )}
      </form>
    </div>
  );
}