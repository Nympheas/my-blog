# 个人博客系统

一个使用 Next.js 15 和 Supabase 构建的现代化个人博客系统，实现了完整的 CRUD 功能和现代化前端开发实践。

## 🎯 功能特性

### 基础功能 ✅
- [x] 文章列表页（含分页）
- [x] 文章详情页 
- [x] 文章创建页面
- [x] 基础 SEO 优化
- [x] 实现 ISR 增量静态再生

### 进阶功能 ✅
- [x] 文章编辑/删除功能
- [x] Markdown 内容渲染
- [x] 标签分类系统
- [x] 评论功能集成
- [x] 部署到 Vercel

## 🛠 技术栈

- **前端框架**: Next.js 15 (App Router)
- **UI 库**: React 19
- **样式**: Tailwind CSS 4
- **数据库**: Supabase (PostgreSQL)
- **语言**: TypeScript
- **部署**: Vercel
- **Markdown**: react-markdown + remark-gfm

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd my-blog
```

### 2. 安装依赖
```bash
npm install
```

### 3. 配置 Supabase

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 复制项目 URL 和 anon key
3. 创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. 初始化数据库

在 Supabase SQL 编辑器中运行 `database-setup.sql` 文件中的 SQL 语句。

### 5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
my-blog/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API 路由
│   │   ├── create/         # 文章创建页面
│   │   ├── posts/          # 文章相关页面
│   │   └── tags/           # 标签页面
│   ├── components/         # React 组件
│   └── lib/               # 工具函数和配置
├── public/                # 静态资源
├── database-setup.sql     # 数据库初始化脚本
└── vercel.json           # Vercel 部署配置
```

## 🔧 主要功能说明

### 文章管理
- **创建文章**: 支持 Markdown 格式，自动生成 slug 和摘要
- **编辑文章**: 完整的编辑功能，支持草稿模式
- **删除文章**: 安全删除确认
- **标签系统**: 支持多标签分类

### 评论系统
- 实时评论提交
- 评论列表展示
- 简单的用户昵称系统

### SEO 优化
- 动态元数据生成
- Open Graph 标签
- 结构化数据
- 搜索引擎友好的 URL

### 性能优化
- ISR (增量静态再生)
- 图片优化
- 代码分割
- 缓存策略

## 🚀 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署完成！

## 📝 使用说明

### 创建文章
1. 访问 `/create` 页面
2. 填写标题和内容（支持 Markdown）
3. 添加标签（用逗号分隔）
4. 选择是否立即发布
5. 点击创建

### 编辑文章
1. 在文章详情页点击"编辑文章"
2. 修改内容
3. 保存更改

### 管理标签
- 点击文章中的标签查看相关文章
- 支持标签页面分页

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Supabase](https://supabase.com/) - 开源 Firebase 替代品
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vercel](https://vercel.com/) - 部署平台
