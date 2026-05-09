---
slug: cloudflare-tailscale-ollama-free-stack
title: "Cloudflare + Tailscale + Ollama - 零成本全栈工作流"
description: "三个人均免费的赛博菩萨服务，搭出一套零成本的生产工作流。Cloudflare 全家桶 + Tailscale 组网 + Ollama 云端 GPU。"
category: Cloudflare
tags: [cloudflare, tailscale, ollama, free-tier, homelab, self-hosted, edge-computing, local-llm]
author: AI Dev Hub
coverImage: /images/blog/free-stack.png
readingTime: 8
createdAt: 2026-05-09
updatedAt: 2026-05-09
publishedAt: 2026-05-09
featured: true
---

# Cloudflare + Tailscale + Ollama：零成本全栈工作流

互联网上有一类公司，别人在砍免费计划的时候，它们反而在扩大。免费额度越给越多，服务越跑越稳，用了好几年，没有任何"免费试用已到期"的弹窗。

我管它们叫**"赛博菩萨"**。

今天聊三个我自己长期在用的：Cloudflare、Tailscale、Ollama。基于这三个服务，一个人就能搭出一套**零成本的生产工作流**。

---

## Cloudflare：互联网基础设施的活菩萨

Cloudflare 的免费计划离谱到什么程度？

| 服务 | 免费额度 |
|------|---------|
| CDN 加速 | **不限量** |
| DNS 解析 | **不限量** |
| DDoS 防护 | **不限量** |
| R2 对象存储 | **10GB + 零出口费用** |
| Workers | **10 万次/天** |
| Pages | **无限站点 + 带宽** |

对比一下：
- AWS S3 免费额度只给 **12 个月**
- DigitalOcean Spaces **根本没有**免费计划
- Cloudflare R2 是**永久免费**，不需要绑信用卡，没有倒计时

### 为什么 Cloudflare 这么慷慨？

免费用户越多，它的网络覆盖越广，跟全球 ISP 谈合作的筹码就越大，带宽成本反而越低。

> **免费用户不是成本，是资产。**

Cloudflare 自己也说了，免费计划不会取消，2025 年底一口气发布了十几个免费功能更新。

### ⚠️ 限制说明

| 限制 | 说明 |
|------|------|
| Workers CPU | 10ms/请求（复杂逻辑可能超时） |
| R2 存储 | 10GB（视频/大文件容易见底） |
| KV 写入 | ~60s 延迟同步到全球 |

---

## Tailscale：组网这件事不用再折腾了

以前想从外面访问家里的 NAS，要么搞内网穿透，要么自建 WireGuard，配置文件写到头疼。

**Tailscale 把这件事简化到了极致：**

1. 装上客户端
2. 登录账号
3. 所有设备自动组成一个虚拟私有网络

### 为什么选 Tailscale？

| 方案 | 复杂度 | 费用 |
|------|--------|------|
| 自建 WireGuard | 高（手动配置） | 服务器费用 |
| 内网穿透服务 | 中 | $5-20/月 |
| **Tailscale** | **零** | **免费** |

- 基于 WireGuard 协议，点对点加密
- 流量**不经过** Tailscale 服务器
- Personal 计划**永久免费**

### 最新福利

最近 Tailscale 做了定价调整，把 Personal Plus 直接合并进了免费计划：

| 功能 | 免费额度 |
|------|---------|
| 用户数 | **6 个** |
| 设备数 | **100 台** |

对个人用户来说，Tailscale 已经是"**装上就忘**"级别的基础设施了。

### ⚠️ 注意事项

| 问题 | 解决方案 |
|------|---------|
| NAT 穿透失败时延迟上升 | 自建 DERP 中继服务器 |
| 控制平面中心化 | 极少出问题，已有连接不受影响 |

---

## Ollama：云端 GPU 也能白嫖了

Ollama 大家可能更熟悉它的本地模式，在自己电脑上跑开源大模型。

**但现在 Ollama 多了一个新能力：云端推理。**

去 [ollama.com/settings/keys](https://ollama.com/settings/keys) 申请一个 API key，就能直接调用云端的大模型。

### 免费用户也能用

| 限制 | 说明 |
|------|------|
| 并发数 | **只能同时跑 1 个云模型** |
| Session 限额 | 5 小时一个 |
| Weekly 限额 | 7 天一个 |

### 可用模型

免费用户也能跑需要大显存才能本地跑的模型，比如 **120B 参数级别**的模型。

具体可用模型列表更新很快，以 [ollama.com](https://ollama.com) 实时显示为准。

### OpenAI 兼容接口

API 格式跟本地调用**一模一样**，切换几乎零成本：

```javascript
// 本地 Ollama
const response = await fetch('http://localhost:11434/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'llama3', messages })
});

// 云端 Ollama - 格式完全相同
const response = await fetch('https://api.ollama.com/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'llama3', messages })
});
```

### ⚠️ 使用建议

| 场景 | 建议 |
|------|------|
| 简单问答 | 用本地小模型 |
| 复杂推理/长上下文 | 用云端大模型 |
| 高并发生产服务 | 不适合 |

---

## 实际怎么串起来用？

```
┌─────────────────────────────────────────────────────────────┐
│                      Cloudflare                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Workers  │  │    R2    │  │    D1    │  │    KV    │     │
│  │  (API)   │  │ (存储)   │  │ (数据库) │  │ (缓存)   │     │
│  └────┬─────┘  └──────────┘  └──────────┘  └──────────┘     │
│       │                                                      │
│       └──────────────┬──────────────────────────────────────┤
│                      │                                       │
│              ┌───────▼────────┐                              │
│              │   Tailscale    │                              │
│              │   (安全组网)    │                              │
│              └───────┬────────┘                              │
│                      │                                        │
│              ┌───────▼────────┐                              │
│              │     Ollama      │                              │
│              │   (云端推理)    │                              │
│              └────────────────┘                              │
└─────────────────────────────────────────────────────────────┘

🏠 家中设备通过 Tailscale 访问
🌐 外部服务通过 Cloudflare Workers
🤖 AI 推理用 Ollama 云端
💾 文件存储用 R2
```

### 实际应用场景

| 需求 | 解决方案 |
|------|---------|
| 外网访问家中 NAS | Tailscale Tunnel |
| 公开 API | Cloudflare Workers |
| 图片/视频存储 | Cloudflare R2 |
| 数据库 | Cloudflare D1 |
| AI 问答/推理 | Ollama 云端 |
| 静态网站 | Cloudflare Pages |

---

## 学生和教育工作者还能多薅一层

如果你是学生或者教育工作者，这三家的免费权益还能再往上叠。

| 服务 | 教育权益 |
|------|---------|
| Cloudflare | [cloudflare.com/students](https://cloudflare.com/students) 申请等待名单 |
| Tailscale | 教育机构付费计划 5 折；开源项目 GitHub 认证可获免费 Community 计划（25 用户） |
| Ollama | 本地版本对所有人完全免费、无任何限制 |

---

## 总结

| 服务 | 核心价值 | 费用 |
|------|---------|------|
| Cloudflare | CDN + Workers + R2 + D1 + KV | $0 |
| Tailscale | 安全组网、内网穿透 | $0 |
| Ollama | 云端大模型推理 | $0 |
| **合计** | **完整生产工作流** | **$0** |

> 免费计划不是试用期，是长期承诺。它们靠免费用户扩大生态，再从企业用户那里赚钱。这个模式越跑越顺，免费计划只会越来越慷慨。

---

*相关阅读：[Cloudflare 免费版藏着的10个王炸功能](/blog/cloudflare-free-tier-10-hidden-features)*
