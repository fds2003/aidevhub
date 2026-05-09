---
slug: cloudflare-free-tier-complete-guide
title: "Cloudflare 免费套餐资源概述 - 开发者完整指南"
description: "Cloudflare Workers、KV、Pages、R2、D1 免费额度详解。附反向代理、API加速、边缘计算、静态托管代码示例。"
category: Cloudflare
tags: [cloudflare, free-tier, cloudflare-workers, cloudflare-pages, cloudflare-r2, cloudflare-d1, cloudflare-kv, edge-computing, wrangler]
author: AI Dev Hub
coverImage: /images/blog/cloudflare-free-guide.png
readingTime: 12
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
---

# Cloudflare 免费套餐资源概述

Cloudflare 免费方案为开发者提供了丰富的基础服务。在此基础上，开发者还可使用 Workers 平台及其他边缘服务。

## 免费资源额度总表

| 资源类型 | 免费额度说明 | 典型用途 |
|:--------|:------------|:---------|
| **Workers** | 每天 100,000 次请求（每次 10ms CPU） | 反向代理、API 加速、边缘计算 |
| **Workers KV** | 每天 100,000 次读、1,000 次写，单命名空间 1GB | 配置存储、静态元数据 |
| **Pages** | 每项目每月 500 次构建，100 个自定义域名，20,000 文件/站点 | 静态网站托管、内容分发 |
| **R2 对象存储** | 每月 10GB 存储，1,000,000 次 Class A、10,000,000 次 Class B 操作，**出站免费** | 大型静态资源、图片、视频存储 |
| **D1 数据库** | 每天 5,000,000 行读、100,000 行写，5GB 存储 | 轻量 SQL 应用、原型开发 |
| **Queues** | 仅付费计划可用 | 消息队列、异步任务 |

> 💡 合理分配和利用这些资源，可以满足大多数中小型项目的需求。

---

## 典型使用场景

### 反向代理与 API 加速

Cloudflare Workers 可作为灵活的请求代理。以下代码实现了简单的反向代理：

```javascript
// 反向代理示例：将请求转发到指定后端 API
addEventListener("fetch", event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  let url = new URL(request.url);
  url.hostname = "api.example.com";
  let response = await fetch(url.toString(), request);
  return response;
}
```

对于 API 缓存加速：

```javascript
// API 缓存加速示例
async function handle(request) {
  const cache = caches.default;
  let response = await cache.match(request);
  
  if (!response) {
    response = await fetch(request);
    response = new Response(response.body, response);
    response.headers.append("Cache-Control", "s-maxage=10");
    ctx.waitUntil(cache.put(request, response.clone()));
  }
  
  return response;
}
```

---

### 边缘计算

Workers 支持在边缘节点运行 JavaScript/Wasmtime，实现离用户更近的计算。

常见应用：

- **自定义访问控制**（基于 IP 的防护）
- **A/B 测试**（动态路由）
- **DDoS 过滤与安全加固**
- **日志收集与异步分析**

---

### 静态网站托管

Cloudflare Pages 是专为静态站点设计的免费托管服务。

**部署流程：**

```bash
# 1. 安装 Wrangler CLI
npm install -g wrangler

# 2. 创建 Pages 项目
wrangler pages project create my-site

# 3. 部署
wrangler pages deploy dist/
```

**Hugo + Cloudflare Pages：**

```toml
# config.toml
baseURL = "https://yourdomain.com/"
title = "我的 Hugo 站点"
languageCode = "zh-cn"
theme = "ananke"
[Params]
  author = "作者名"
```

将生成的 `public/` 文件夹推送到 GitHub，关联 Pages 后自动部署。

---

## 使用技巧与注意事项

### ✅ 推荐做法

1. **静态资源直接免费**：将图片、CSS、JS 缓存为静态资源，充分利用免费带宽
2. **合理设置缓存策略**：API 缓存设置合适的 `s-maxage`
3. **利用 Cron Triggers**：Workers 支持定时任务（免费），适合低频作业

### ⚠️ 注意事项

| 限制 | 说明 |
|------|------|
| CPU 时间 | 单次执行默认 10ms（可申请延长） |
| 执行时间 | 默认最大 30 秒（可申请 5 分钟） |
| KV 写入延迟 | Workers KV 写入有 ~60s 延迟 |
| 额度重置 | 大部分按日（UTC 零点）重置 |

---

## 推荐工具链

### Wrangler CLI

Cloudflare 官方 CLI 工具：

```toml
# wrangler.toml
name = "my-worker"
type = "javascript"
account_id = "YOUR_ACCOUNT_ID"
```

```bash
# 常用命令
wrangler init my-project
wrangler dev          # 本地开发
wrangler deploy       # 部署
wrangler kv:namespace create "NAMESPACE"
wrangler d1 create "my-database"
```

### GitHub Actions 自动化部署

```yaml
# .github/workflows/deploy.yml
name: Deploy Worker
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Publish to Cloudflare Workers
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

---

## 完整开发栈推荐

```
┌─────────────────────────────────────────────────┐
│                   前端                           │
│    Next.js/Hugo → Cloudflare Pages（免费托管）    │
├─────────────────────────────────────────────────┤
│                   后端                           │
│    Cloudflare Workers（100k req/天免费）           │
├─────────────────────────────────────────────────┤
│                   存储                           │
│    Cloudflare R2（10GB + 零 egress）              │
├─────────────────────────────────────────────────┤
│                   数据库                         │
│    Cloudflare D1（5GB + 5M reads/天）            │
├─────────────────────────────────────────────────┤
│                   缓存                           │
│    Cloudflare KV（1M reads/天）                   │
├─────────────────────────────────────────────────┤
│                   安全                           │
│    Zero Trust（50用户免费）+ Turnstile（免费）    │
└─────────────────────────────────────────────────┘

💰 月费用：$0
```

---

Cloudflare 免费套餐为开发者提供了丰富的边缘计算与托管资源。通过合理利用 Workers、KV、Pages、R2、D1 等服务，可以实现高效、低成本的 Web 应用部署。

**建议根据实际需求，灵活组合各项资源，充分发挥 Cloudflare 的全球网络优势。**

---

*相关阅读：[Cloudflare 免费版藏着的10个王炸功能](/blog/cloudflare-free-tier-10-hidden-features)*
