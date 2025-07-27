import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型定义
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  slug: string
  tags: string[]
  published: boolean
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  post_id: string
  author: string
  content: string
  created_at: string
} 