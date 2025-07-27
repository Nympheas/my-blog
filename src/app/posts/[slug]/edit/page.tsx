'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { generateSlug, generateExcerpt } from '@/lib/utils'

interface EditPageProps {
  params: Promise<{ slug: string }>
}

export default function EditPage({ params }: EditPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    published: true
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [postId, setPostId] = useState('')
  const [slug, setSlug] = useState('')

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
      
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/posts/${resolvedParams.slug}`)
          if (response.ok) {
            const post = await response.json()
            setFormData({
              title: post.title,
              content: post.content,
              tags: post.tags?.join(', ') || '',
              published: post.published
            })
            setPostId(post.id)
          } else {
            router.push('/')
          }
        } catch (error) {
          console.error('获取文章失败:', error)
          router.push('/')
        } finally {
          setIsLoading(false)
        }
      }

      fetchPost()
    }

    resolveParams()
  }, [params, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          slug: generateSlug(formData.title),
          excerpt: generateExcerpt(formData.content),
          tags,
          published: formData.published,
        }),
      })

      if (response.ok) {
        const post = await response.json()
        router.push(`/posts/${post.slug}`)
      } else {
        throw new Error('更新文章失败')
      }
    } catch (error) {
      console.error('更新文章失败:', error)
      alert('更新文章失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('确定要删除这篇文章吗？此操作不可撤销。')) {
      return
    }

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/')
      } else {
        throw new Error('删除文章失败')
      }
    } catch (error) {
      console.error('删除文章失败:', error)
      alert('删除文章失败，请重试')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-gray-500">加载中...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">编辑文章</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              文章标题
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              文章内容 (支持 Markdown)
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={20}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              placeholder="在这里写入你的文章内容，支持 Markdown 格式..."
              required
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              标签 (用逗号分隔)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="技术, 编程, Next.js"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              发布文章
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? '更新中...' : '更新文章'}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              取消
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              删除文章
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
} 