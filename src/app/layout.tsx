import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "我的博客 - 分享技术、生活和思考",
    template: "%s - 我的博客"
  },
  description: "一个使用 Next.js 和 Supabase 构建的个人博客系统",
  keywords: ["博客", "技术", "编程", "Next.js", "React"],
  authors: [{ name: "博主" }],
  creator: "博主",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://your-blog-domain.com",
    title: "我的博客",
    description: "分享技术、生活和思考",
    siteName: "我的博客",
  },
  twitter: {
    card: "summary_large_image",
    title: "我的博客",
    description: "分享技术、生活和思考",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
