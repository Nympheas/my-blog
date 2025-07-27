 -- 创建 posts 表
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建 comments 表
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- 启用 RLS (Row Level Security)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 创建策略 (允许所有人读取已发布的文章)
CREATE POLICY "Allow public read access to published posts" ON posts
  FOR SELECT USING (published = true);

-- 允许所有人创建评论
CREATE POLICY "Allow public insert comments" ON comments
  FOR INSERT WITH CHECK (true);

-- 允许所有人读取评论
CREATE POLICY "Allow public read comments" ON comments
  FOR SELECT USING (true);

-- 创建函数来自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 创建触发器
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据
INSERT INTO posts (title, content, excerpt, slug, tags, published) VALUES
(
  '欢迎来到我的博客',
  '# 欢迎来到我的博客

这是一个使用 Next.js 和 Supabase 构建的个人博客系统。

## 功能特性

- ✅ 文章列表页（含分页）
- ✅ 文章详情页 
- ✅ 文章创建页面
- ✅ 基础 SEO 优化
- ✅ 实现 ISR 增量静态再生
- ✅ 文章编辑/删除功能
- ✅ Markdown 内容渲染
- ✅ 标签分类系统
- ✅ 评论功能集成

## 技术栈

- **前端**: Next.js 15, React 19, TypeScript
- **样式**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **部署**: Vercel

## 开始使用

1. 克隆项目
2. 安装依赖: `npm install`
3. 配置环境变量
4. 运行开发服务器: `npm run dev`

享受写作的乐趣吧！',
  '这是一个使用 Next.js 和 Supabase 构建的个人博客系统，包含完整的 CRUD 功能和现代化前端开发实践。',
  'welcome-to-my-blog',
  ARRAY['博客', 'Next.js', 'Supabase'],
  true
);

-- 删除现有的策略（如果存在）
DROP POLICY IF EXISTS "Allow public read access to published posts" ON posts;
DROP POLICY IF EXISTS "Allow public insert posts" ON posts;
DROP POLICY IF EXISTS "Allow public update posts" ON posts;
DROP POLICY IF EXISTS "Allow public delete posts" ON posts;

-- 重新创建所有策略
-- 允许所有人读取已发布的文章
CREATE POLICY "Allow public read access to published posts" ON posts
  FOR SELECT USING (published = true);

-- 允许所有人插入文章
CREATE POLICY "Allow public insert posts" ON posts
  FOR INSERT WITH CHECK (true);

-- 允许所有人更新文章
CREATE POLICY "Allow public update posts" ON posts
  FOR UPDATE USING (true);

-- 允许所有人删除文章
CREATE POLICY "Allow public delete posts" ON posts
  FOR DELETE USING (true);

-- 评论表的策略（如果还没有的话）
DROP POLICY IF EXISTS "Allow public insert comments" ON comments;
DROP POLICY IF EXISTS "Allow public read comments" ON comments;

CREATE POLICY "Allow public insert comments" ON comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read comments" ON comments
  FOR SELECT USING (true);