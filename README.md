# AI Dev Hub

Your premier destination for AI Coding Tools, MCP Ecosystem, AI Agents, and Workflow automation.

## Tech Stack (Cloudflare 方案)

| 功能 | 技术方案 | 免费额度 |
|------|---------|---------|
| 前端 | Next.js 15 + Cloudflare Pages | 无限带宽 |
| 数据库 | Cloudflare D1 | 5GB |
| 存储 | Cloudflare R2 | 10GB + 零出口费 |
| API | Cloudflare Workers | 100K 请求/天 |
| 验证 | Cloudflare Turnstile | 免费 |
| 分析 | Cloudflare Analytics | 免费 |

## 快速部署

完整步骤（Pages / Workers / D1 / CI）见 **[DEPLOYMENT.md](./DEPLOYMENT.md)**。

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

### 2. 创建 D1 数据库

```bash
cd src
wrangler d1 create aidevhub-db
# 将返回的 database_id 填入 wrangler.toml
```

### 3. 初始化数据库

```bash
wrangler d1 execute aidevhub-db --remote --file=./schema.sql
```

### 4. 部署

```bash
# 本地构建
npm run build

# 部署到 Cloudflare Pages
npx wrangler pages deploy .next --project-name=aidevhub

# 或使用 GitHub Actions 自动部署（见 .github/workflows/deploy.yml）
```

## 本地开发

```bash
cd src
npm install
npm run dev
```

## 项目结构

```
src/
├── app/               # Next.js 页面
├── components/        # React 组件
│   └── ui/           # shadcn/ui
├── content/          # MDX 内容
├── lib/              # 工具函数
├── workers/          # Cloudflare Workers
└── schema.sql        # D1 数据库 Schema
```

## 环境变量

复制 `.env.example` 并配置：

```bash
cp .env.example .env.local
```

## 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发服务器 |
| `npm run build` | 构建 |
| `npm run generate:tool` | 生成工具页 |
| `npm run generate:blog` | 生成博客文章 |

## License

MIT
