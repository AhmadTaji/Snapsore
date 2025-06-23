



// 'use client';
// import { useEffect, useState } from 'react';

// interface Review {
//   _id: string;
//   productId: string;
//   userId: string;
//   userName?: string;
//   comment: string;
//   rating: number;
//   createdAt: string;
// }

// export default function ReviewList({ productId }: { productId: string }) {
//   const [reviews, setReviews] = useState<Review[]>([]);

//   useEffect(() => {
//     async function loadReviews() {
//       const res = await fetch(`/api/reviews/${productId}`);
//       const data = await res.json();
//       setReviews(data);
//     }
//     loadReviews();
//   }, [productId]);

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 h-full flex flex-col">
//       <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
//       {reviews.length === 0 ? (
//         <p className="text-gray-400 italic text-center py-8">No reviews yet. Be the first to review this product!</p>
//       ) : (
//         <div className="flex flex-col gap-4 flex-1">
//           {reviews.map((review) => (
//             <div key={review._id} className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm flex flex-col gap-1">
//               <div className="flex items-center gap-2 mb-1">
//                 <span className="font-semibold text-blue-700">{review.userName || 'Anonymous'}</span>
//                 <span className="text-yellow-500 text-base">
//                   {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
//                 </span>
//                 <span className="text-xs text-gray-400 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
//               </div>
//               <p className="text-gray-700">{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';

interface Review {
  _id: string;
  productId: string;
  userId: string;
  userName?: string;
  comment: string;
  rating: number;
  createdAt: string;
}

const REVIEWS_PER_PAGE = 4;

export default function ReviewList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadReviews() {
      const res = await fetch(`/api/reviews/${productId}`);
      const data = await res.json();
      setReviews(data);
    }
    loadReviews();
  }, [productId]);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const displayed = reviews.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
      {displayed.length === 0 ? (
        <p className="text-gray-400 italic text-center py-8">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="flex flex-col gap-4 flex-1">
          {displayed.map((review) => (
            <div key={review._id} className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-700">{review.userName || 'Anonymous'}</span>
                <span className="text-yellow-500 text-base">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </span>
                <span className="text-xs text-gray-400 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2 py-1 text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}