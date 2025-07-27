'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'
import { generateSlug, generateExcerpt } from '@/lib/utils'

export default function CreatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    published: true
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const tags = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const response = await fetch('/api/posts', {
        method: 'POST',
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
        console.log('创建成功，文章信息:', post)
        router.push(`/posts/${post.slug}`)
      } else {
        const errorData = await response.json()
        console.error('创建失败，错误信息:', errorData)
        throw new Error('创建文章失败')
      }
    } catch (error) {
      console.error('创建文章失败:', error)
      alert('创建文章失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">创建新文章</h1>
        
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
              立即发布
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? '创建中...' : '创建文章'}
            </button>
            
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              取消
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-900 mb-2">Markdown 语法提示</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li># 一级标题</li>
            <li>## 二级标题</li>
            <li>**粗体文本**</li>
            <li>*斜体文本*</li>
            <li>`代码`</li>
            <li>```代码块```</li>
            <li>[链接文本](URL)</li>
            <li>![图片描述](图片URL)</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
} 