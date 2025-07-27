import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import { postService } from '@/lib/database'
import { getPaginationInfo } from '@/lib/utils'

interface TagPageProps {
  params: Promise<{ tag: string }>
  searchParams: Promise<{ page?: string }>
}

// 启用 ISR，每 60 秒重新生成
export const revalidate = 60

// 生成元数据
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  return {
    title: `标签: ${tag} - 我的博客`,
    description: `查看标签为 "${tag}" 的所有文章`,
  }
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { tag } = await params
  const searchParamsResolved = await searchParams
  try {
    const page = parseInt(searchParamsResolved.page || '1')
    const limit = 10
    
    const { posts, total } = await postService.getPostsByTag(tag, page, limit)
    const pagination = getPaginationInfo(page, total, limit)

    return (
      <Layout>
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              标签: {tag}
            </h1>
            <p className="text-xl text-gray-600">
              共找到 {total} 篇文章
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">该标签下暂无文章</p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPrevPage={pagination.hasPrevPage}
                baseUrl={`/tags/${tag}`}
              />
            </>
          )}
        </div>
      </Layout>
    )
  } catch (error) {
    notFound()
  }
} 