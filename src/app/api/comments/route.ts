import { NextRequest, NextResponse } from 'next/server'
import { commentService } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const comment = await commentService.createComment(body)
    
    return NextResponse.json(comment)
  } catch (error) {
    console.error('创建评论失败:', error)
    return NextResponse.json(
      { error: '创建评论失败' },
      { status: 500 }
    )
  }
} 