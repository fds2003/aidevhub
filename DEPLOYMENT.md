# AI Dev Hub — Cloudflare 完整部署教程

本文说明如何把本项目部署到 **Cloudflare Pages（Next.js 前端）**、**Cloudflare Workers（REST API）**、以及 **D1 / R2 / KV**。仓库内 Next 应用位于 **`src/`** 目录。

---

## 架构说明（部署前先读）

| 组件 | 作用 | 是否必需 |
|------|------|----------|
| **Next.js（`src/app`）** | 页面与 SEO；正文内容来自 `src/content/**/*.md`，由 `lib/content.ts` 在构建时读取 | **必需** |
| **Workers（`src/workers`）** | 提供 `/api/tools`、`/api/posts`、`/api/track` 等，数据来自 **D1** | **可选**（当前前端列表页主要走 Markdown，不调用该 API 亦可运行） |
| **D1** | Workers 使用的 SQLite | 仅在使用 Workers API 时需要 |
| **R2** | Worker 中 `/assets/*` 读对象存储 | Worker 已绑定则需在控制台创建桶并填 ID |
| **KV** | `wrangler.toml` 中已声明 `CACHE` 绑定 | Worker 代码未使用，但仍需在 Cloudflare 创建 KV 并在配置中填写真实 `id`，否则部署可能失败 |

---

## 一、前置条件

- [Cloudflare](https://dash.cloudflare.com/) 账号  
- [Node.js](https://nodejs.org/) 20.x（与 CI 一致）  
- 本仓库克隆到本地  

---

## 二、安装 Wrangler 并登录

```bash
npm install -g wrangler
wrangler login
wrangler whoami
```

以下 **`wrangler`** 命令若在**仓库根目录**（包含 `src/` 的那一层）执行，请使用 **`--config src/wrangler.toml`**。若在 **`src/`** 目录内执行，可直接 `wrangler deploy`（此时默认读取当前目录的 `wrangler.toml`）。

---

## 三、创建云端资源并填写 `wrangler.toml`

在 **`src/wrangler.toml`** 中需要替换占位符：

### 1. D1 数据库

```bash
# 在仓库根目录执行示例：
wrangler d1 create aidevhub-db
```

把命令输出里的 **`database_id`** 填入 `wrangler.toml` 的 `database_id = "..."`。

### 2. 初始化表结构

```bash
# 远程执行 schema（推荐）
wrangler d1 execute aidevhub-db --remote --file=src/schema.sql
```

若你在 **`src/`** 目录下执行：

```bash
wrangler d1 execute aidevhub-db --remote --file=./schema.sql
```

### 3. R2 存储桶

在 [Cloudflare Dashboard → R2](https://dash.cloudflare.com/) 中创建桶，名称需与 `wrangler.toml` 中 `bucket_name`（默认 `aidevhub-assets`）一致。

### 4. KV 命名空间

```bash
wrangler kv namespace create "CACHE"
```

将返回的 **id** 填入 `wrangler.toml` 的 `[[kv_namespaces]]` → `id`。

### 5. 校验 `wrangler.toml`

确认以下项已不再是占位符：

- `database_id`
- KV 的 `id`
- R2 的 `bucket_name` 与控制台一致  

`main` 入口应为 **`workers/index.ts`**（相对于 `src/wrangler.toml`）。

---

## 四、部署 Cloudflare Workers（API）

在**仓库根目录**：

```bash
wrangler deploy --config src/wrangler.toml
```

或在 **`src/`** 目录：

```bash
wrangler deploy
```

成功后控制台会给出 Worker URL，例如：`https://aidevhub-api.<子域>.workers.dev`。

若前端某处使用 `lib/database.ts` 请求 API，请在 Pages 环境变量中设置：

```bash
NEXT_PUBLIC_API_URL=https://aidevhub-api.<子域>.workers.dev
```

（见 `src/.env.example`。）

---

## 五、部署 Next.js 到 Cloudflare Pages

Next.js 默认构建产物 **`src/.next` 不能直接当作静态站上传**。要在 Cloudflare Pages 上跑完整 Next 应用，请任选其一：

### 方案 A：控制台连接 Git（推荐入门）

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**。  
2. 选择仓库，配置：  
   - **Root directory**：`src`  
   - **Build command**：`npm run build`  
   - **Build output directory**：需按你所用的 Cloudflare Next 适配方式填写（见下方「适配器」）。  
3. 环境变量：至少配置 **`NEXT_PUBLIC_SITE_URL`**（生产站点 URL，含 `https://`）。  

### 方案 B：使用 OpenNext（Cloudflare 官方推荐的 Next 部署路径之一）

请参考当前 Cloudflare 文档中的 **OpenNext Cloudflare** / **Next.js on Cloudflare** 流程：在项目中加入对应适配依赖与构建脚本后，构建会产出 Pages 要求的输出目录（文档会写明 `output` 路径），再：

```bash
npx wrangler pages deploy <适配器生成的输出目录> --project-name=aidevhub
```

> **说明**：未集成适配器时，仅执行 `npm run build` 再上传 `.next`，通常**无法**在 Pages 上正常作为 Next 站点运行。请优先完成适配或改用 Vercel 部署 Next。

### 方案 C：纯静态导出（仅当项目兼容 `output: 'export'`）

若你愿意改造 `next.config` 为静态导出，且接受 **Route Handlers（`app/api/*`）** 等行为受限，可使用 `output: 'export'` 并部署生成的 **`out/`**。本项目含有 **`app/api/track`**、**`app/api/subscribe`** 等路由，启用静态导出前需评估是否迁移或删除这些能力。

---

## 六、本地验证

```bash
cd src
npm install
npm run build
npm run start
```

浏览器访问 `http://localhost:3000` 检查首页、博客、工具页是否正常。

---

## 七、GitHub Actions 自动部署

GitHub 默认只识别仓库**根目录**下的 **`.github/workflows/*.yml`**。当前文件若在 **`src/.github/workflows/deploy.yml`**，CI **不会**触发，请将其移动到 **`<repo-root>/.github/workflows/deploy.yml`**（或复制一份），并把文中路径（如 `src/package-lock.json`）保持与 mono 结构一致。

迁移后，在仓库配置：

| 类型 | 名称 | 说明 |
|------|------|------|
| Secret | `CLOUDFLARE_API_TOKEN` | 需包含 Pages、Workers、编辑权限（按你启用的产品勾选） |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |
| Variable | `NEXT_PUBLIC_SITE_URL` | 生产站点完整 URL |

**注意**：当前 workflow 里 Pages 的 `directory: src/.next` 在未接入 Next 适配器时可能不符合 Pages 对 Next 的要求；接入 OpenNext 等方案后，请将 `directory` 改为适配文档要求的输出目录。

Workers 一步使用：

```yaml
command: deploy --config src/wrangler.toml
```

与本文第四节一致（在仓库根目录执行）。

---

## 八、环境与域名

### Pages / 本地

复制示例环境变量：

```bash
cp src/.env.example src/.env.local
```

按需填写 Turnstile、分析脚本等（见 `.env.example` 注释）。

### 自定义域名

在 Cloudflare Pages 项目 → **Custom domains** 绑定域名；Worker 可在 **Triggers → Routes** 或 **Workers Routes** 下挂载路径或子域。

---

## 九、部署后检查清单

- [ ] 首页、`/blog`、`/tools` 可打开且无 500  
- [ ] `robots.txt`、`sitemap.xml`（若启用）可访问  
- [ ] `NEXT_PUBLIC_SITE_URL` 与浏览器地址一致，OG 预览正常  
- [ ] （若使用 Worker）`wrangler d1 execute ... --command "SELECT COUNT(*) FROM tools"` 有合理结果  
- [ ] （若使用 Worker）浏览器或 curl 访问 `https://<worker>/api/tools` 返回 JSON  

---

## 十、常见问题

**1. `wrangler deploy` 报错找不到入口文件**  
确认 `src/wrangler.toml` 中 `main = "workers/index.ts"`，且文件存在于 `src/workers/index.ts`。

**2. Worker 运行时 D1 报错**  
确认已执行 `schema.sql`，且 `database_id` 与绑定数据库一致。

**3. Pages 构建成功但站点空白或 404**  
多为未使用 Next 适配器却上传了错误目录；请按第五节改用适配方案或调整输出目录。

**4. CORS**  
Worker 已对 API 使用宽松 CORS；若前端与 API 不同域，仍可按需在 Worker 中收紧 `Access-Control-Allow-Origin`。

---

## 十一、仓库内脚本说明

- **`src/scripts/deploy.sh`**：包含 `wrangler deploy` 与历史版 Pages 上传命令；**Pages 上传方式可能与当前 Next 版本不匹配**，请以本文第五节为准。  
- **`README.md` / `README_CLOUDFLARE.md`**：快速命令参考；细节以 **`DEPLOYMENT.md`** 为准。

---

维护提示：Cloudflare 对 Next.js 的推荐集成方式会更新，部署前请对照 [Cloudflare Developers — Next.js](https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs/) 最新文档核对构建命令与输出目录。
