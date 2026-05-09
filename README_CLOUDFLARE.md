# AI Dev Hub - Cloudflare 部署指南

## 技术架构

基于 Cloudflare 免费套餐的完整解决方案：

| 功能 | Cloudflare 服务 | 免费额度 |
|------|---------------|---------|
| 前端部署 | Pages | 无限带宽 |
| 数据库 | D1 | 5GB 存储 |
| 对象存储 | R2 | 10GB + 零出口费 |
| 边缘函数 | Workers | 100K 请求/天 |

## 快速部署

```bash
# 安装 Wrangler
npm install -g wrangler
wrangler login

# 创建 D1 数据库
wrangler d1 create aidevhub-db

# 构建并部署
npm run build
npx wrangler pages deploy dist --project-name=aidevhub
```

## 本地开发

```bash
npm install
npm run dev
```
