'use client'

import { useState } from 'react'
import { Comment } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'

interface CommentSectionProps {
  postId: string
  comments: Comment[]
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const [newComment, setNewComment] = useState('')
  const [author, setAuthor] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [localComments, setLocalComments] = useState(comments)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !author.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          author: author.trim(),
          content: newComment.trim(),
        }),
      })

      if (response.ok) {
        const comment = await response.json()
        setLocalComments([...localComments, comment])
        setNewComment('')
        setAuthor('')
      }
    } catch (error) {
      console.error('提交评论失败:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">评论</h2>
      
      {/* 评论表单 */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="space-y-4">
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
              昵称
            </label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              评论内容
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="写下你的想法..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? '提交中...' : '提交评论'}
          </button>
        </div>
      </form>

      {/* 评论列表 */}
      <div className="space-y-6">
        {localComments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">暂无评论，来发表第一条评论吧！</p>
        ) : (
          localComments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{comment.author}</span>
                <time className="text-sm text-gray-500" dateTime={comment.created_at}>
                  {formatDate(comment.created_at)}
                </time>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  )
} 