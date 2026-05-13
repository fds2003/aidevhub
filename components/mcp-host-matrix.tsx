import { MCP_HOST_MATRIX_ROWS } from '@/lib/mcp-directory'

/** 各 MCP 客户端对传输与认证方式的典型支持（截至 2026-05，以各产品最新文档为准） */
export function McpHostMatrix() {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#1c1c2e] bg-[#111118]">
      <table className="w-full min-w-[640px] text-left text-sm text-zinc-300">
        <caption className="sr-only">MCP 宿主客户端能力矩阵</caption>
        <thead>
          <tr className="border-b border-[#1c1c2e] text-zinc-400">
            <th className="p-3 font-medium">客户端</th>
            <th className="p-3 font-medium">说明</th>
            <th className="p-3 font-medium">stdio / 本地子进程</th>
            <th className="p-3 font-medium">远程 SSE / HTTP</th>
            <th className="p-3 font-medium">OAuth 等登录型工具</th>
          </tr>
        </thead>
        <tbody>
          {MCP_HOST_MATRIX_ROWS.map((row) => (
            <tr key={row.host} className="border-b border-[#1c1c2e]/80 last:border-0 align-top">
              <td className="p-3 font-medium text-zinc-100 whitespace-nowrap">{row.host}</td>
              <td className="p-3 text-zinc-500 max-w-xs">{row.description}</td>
              <td className="p-3">{row.stdio}</td>
              <td className="p-3">{row.sse}</td>
              <td className="p-3">{row.oauthTools}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-xs text-zinc-500 border-t border-[#1c1c2e]">
        能力随版本变化较快；若与官方文档不一致，以 Claude / Cursor / Windsurf / Codeium 发布说明为准。
      </p>
    </div>
  )
}
