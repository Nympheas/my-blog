import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用静态导出（可选）
  // output: 'export',
  
  // 图片优化
  images: {
    domains: ['your-domain.com'], // 添加你的图片域名
    formats: ['image/webp', 'image/avif'],
  },
  
  // 压缩配置
  compress: true,
  
  // 安全头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // 实验性功能（Next.js 15 中 App Router 已经是默认的）
  experimental: {
    // 可以添加其他实验性功能
  },
};

export default nextConfig;
