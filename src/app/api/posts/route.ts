import { NextRequest, NextResponse } from 'next/server'
import { postService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const post = await postService.createPost(body)
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('创建文章失败:', error)
    return NextResponse.json(
      { error: '创建文章失败' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    const result = await postService.getPosts(page, limit)
    return NextResponse.json(result)
  } catch (error) {
    console.error('获取文章列表失败:', error)
    return NextResponse.json(
      { error: '获取文章列表失败' },
      { status: 500 }
    )
  }
} 