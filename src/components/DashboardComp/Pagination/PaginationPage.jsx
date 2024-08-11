"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function PaginationPage({ totalItems, itemsPerPage, currentPage, basePath }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    return params.toString();
  };

  const handlePageChange = (page) => {
    router.push(`${basePath}?${createQueryString('page', page)}`);
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`${basePath}?${createQueryString('page', page)}`}
          className={`px-3 py-2 rounded ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(page);
          }}
        >
          {page}
        </Link>
      ))}
    </div>
  );
}

export default PaginationPage;