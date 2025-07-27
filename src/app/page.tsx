import { Suspense } from 'react'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import { postService } from '@/lib/database'
import { getPaginationInfo } from '@/lib/utils'

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

// 启用 ISR，每 60 秒重新生成
export const revalidate = 60

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = parseInt(params.page || '1')
  const limit = 10
  
  const { posts, total } = await postService.getPosts(page, limit)
  const pagination = getPaginationInfo(page, total, limit)

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            欢迎来到我的博客
          </h1>
          <p className="text-xl text-gray-600">
            分享技术、生活和思考
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">暂无文章</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Suspense fallback={<div>加载中...</div>}>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Suspense>
            </div>

            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              hasNextPage={pagination.hasNextPage}
              hasPrevPage={pagination.hasPrevPage}
              baseUrl="/"
            />
          </>
        )}
      </div>
    </Layout>
  )
}
