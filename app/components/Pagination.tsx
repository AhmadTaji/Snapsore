
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center space-x-2 mt-6">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md ${
            page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
