import Link from 'next/link'
import { Post } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={post.created_at}>
            {formatDate(post.created_at)}
          </time>
        </div>
        
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        
        <Link
          href={`/posts/${post.slug}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          阅读更多
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
} 