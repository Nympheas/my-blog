import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  baseUrl: string
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  baseUrl
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    return page === 1 ? baseUrl : `${baseUrl}?page=${page}`
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8">
      {hasPrevPage && (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          上一页
        </Link>
      )}
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={getPageUrl(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </Link>
      ))}
      
      {hasNextPage && (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          下一页
        </Link>
      )}
    </nav>
  )
} 