# Wiki App - 维基百科风格的知识共享平台

一个基于 Next.js 14 构建的维基百科风格网站，支持用户创建、编辑词条，使用 Markdown 语法编写内容。

## 功能特性

- 📝 **词条管理**：创建、编辑、查看词条
- 🔐 **用户认证**：支持本地注册登录和 Google OAuth 登录
- ✍️ **Markdown 编辑器**：富文本编辑，支持 Markdown 语法
- 🔍 **搜索功能**：全文搜索词条内容
- 📱 **响应式设计**：适配各种设备屏幕
- 🕒 **版本历史**：记录每次编辑的历史版本

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **数据库**: SQLite + Prisma ORM
- **认证**: NextAuth.js
- **编辑器**: @uiw/react-md-editor
- **Markdown 渲染**: react-markdown

## 开始使用

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

创建 `.env.local` 文件：

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

# Google OAuth (可选)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. 初始化数据库

```bash
npx prisma db push
npx prisma generate
```

### 4. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## Google OAuth 配置

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 启用 Google+ API
4. 创建 OAuth 2.0 客户端 ID
5. 设置授权重定向 URI: `http://localhost:3000/api/auth/callback/google`
6. 将客户端 ID 和密钥添加到 `.env.local`

## 项目结构

```
wiki-app/
├── app/                    # Next.js 应用目录
│   ├── api/               # API 路由
│   ├── articles/          # 词条相关页面
│   ├── auth/              # 认证页面
│   ├── profile/           # 用户资料页
│   └── search/            # 搜索页面
├── components/            # React 组件
├── lib/                   # 工具函数和配置
├── prisma/                # 数据库 schema
└── public/                # 静态资源
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署

### 生产环境注意事项

- 更改 `NEXTAUTH_SECRET` 为强密码
- 使用生产数据库（如 PostgreSQL）
- 配置真实的 Google OAuth 凭据
- 设置正确的 `NEXTAUTH_URL`

## License

MIT