import { supabase, Post, Comment } from './supabase'

// 文章相关操作
export const postService = {
  // 获取所有已发布的文章（分页）
  async getPosts(page = 1, limit = 10) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    return { posts: data as Post[], total: count || 0 }
  },

  // 根据 slug 获取单篇文章
  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data as Post
  },

  // 根据 slug 获取已发布的文章
  async getPublishedPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return data as Post
  },

  // 创建新文章
  async createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('posts')
      .insert([post])
      .select()
      .single()

    if (error) throw error
    return data as Post
  },

  // 更新文章
  async updatePost(id: string, updates: Partial<Post>) {
    const { data, error } = await supabase
      .from('posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Post
  },

  // 删除文章
  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  },

  // 根据标签获取文章
  async getPostsByTag(tag: string, page = 1, limit = 10) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .contains('tags', [tag])
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    return { posts: data as Post[], total: count || 0 }
  }
}

// 评论相关操作
export const commentService = {
  // 获取文章评论
  async getComments(postId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data as Comment[]
  },

  // 创建评论
  async createComment(comment: Omit<Comment, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('comments')
      .insert([comment])
      .select()
      .single()

    if (error) throw error
    return data as Comment
  }
} 