import Layout from '@/components/Layout'
import { postService } from '@/lib/database'
import { supabase } from '@/lib/supabase'

export default async function DebugPage() {
  try {
    // 获取所有文章（包括未发布的）
    const { data: allPosts } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    // 获取已发布的文章
    const { posts: publishedPosts } = await postService.getPosts(1, 100)

    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">调试页面</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">所有文章 ({allPosts?.length || 0})</h2>
              <div className="bg-white rounded-lg shadow p-6">
                {allPosts?.map((post: any) => (
                  <div key={post.id} className="border-b border-gray-200 py-4 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                        <p className="text-sm text-gray-600">Published: {post.published ? '是' : '否'}</p>
                      </div>
                      <a
                        href={`/posts/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                      >
                        查看
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">已发布文章 ({publishedPosts?.length || 0})</h2>
              <div className="bg-white rounded-lg shadow p-6">
                {publishedPosts?.map((post: any) => (
                  <div key={post.id} className="border-b border-gray-200 py-4 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{post.title}</h3>
                        <p className="text-sm text-gray-600">Slug: {post.slug}</p>
                      </div>
                      <a
                        href={`/posts/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800"
                        target="_blank"
                      >
                        查看
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  } catch (error) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">调试页面</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">错误</h2>
            <p className="text-red-700">{error instanceof Error ? error.message : '未知错误'}</p>
          </div>
        </div>
      </Layout>
    )
  }
} 