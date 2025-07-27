import { format } from 'date-fns'

// 格式化日期
export function formatDate(date: string | Date) {
  return format(new Date(date), 'yyyy年MM月dd日')
}

// 生成 slug
export function generateSlug(title: string) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
  
  // 添加时间戳确保唯一性
  const timestamp = Date.now().toString(36)
  return `${baseSlug}-${timestamp}`
}

// 生成摘要
export function generateExcerpt(content: string, maxLength = 150) {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ')
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText
}

// 分页计算
export function getPaginationInfo(currentPage: number, total: number, limit: number) {
  const totalPages = Math.ceil(total / limit)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  return {
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    start: (currentPage - 1) * limit + 1,
    end: Math.min(currentPage * limit, total)
  }
} 