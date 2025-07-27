import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Layout from '@/components/Layout'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { postService } from '@/lib/database'
import { formatDate } from '@/lib/utils'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// 启用 ISR，每 60 秒重新生成
export const revalidate = 60

// 生成元数据
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const post = await postService.getPublishedPostBySlug(slug)
    
    return {
      title: `${post.title} - 我的博客`,
      description: post.excerpt,
      keywords: post.tags?.join(', '),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
      },
    }
  } catch {
    return {
      title: '文章未找到 - 我的博客',
    }
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  try {
    const post = await postService.getPublishedPostBySlug(slug)

    return (
      <Layout>
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center text-gray-500 mb-6">
              <time dateTime={post.created_at}>
                发布于 {formatDate(post.created_at)}
              </time>
              {post.updated_at !== post.created_at && (
                <span className="ml-4">
                  更新于 {formatDate(post.updated_at)}
                </span>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-lg max-w-none mb-12">
            <MarkdownRenderer content={post.content} />
          </div>

          <div className="flex justify-end mb-8">
            <Link
              href={`/posts/${post.slug}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              编辑文章
            </Link>
          </div>

          {/* 评论功能暂时移除 */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">评论</h2>
            <p className="text-gray-600">评论功能正在开发中...</p>
          </div>
        </article>
      </Layout>
    )
  } catch (error) {
    notFound()
  }
} 