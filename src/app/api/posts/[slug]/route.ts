import { NextRequest, NextResponse } from 'next/server'
import { postService } from '@/lib/database'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const post = await postService.getPostBySlug(slug)
    return NextResponse.json(post)
  } catch (error) {
    console.error('获取文章失败:', error)
    return NextResponse.json(
      { error: '文章未找到' },
      { status: 404 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const body = await request.json()
    const post = await postService.getPostBySlug(slug)
    const updatedPost = await postService.updatePost(post.id, body)
    
    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('更新文章失败:', error)
    return NextResponse.json(
      { error: '更新文章失败' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  try {
    const post = await postService.getPostBySlug(slug)
    await postService.deletePost(post.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('删除文章失败:', error)
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    )
  }
} 