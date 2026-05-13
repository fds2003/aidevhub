import { MCP_HOST_MATRIX_ROWS } from '@/lib/mcp-directory'

/** Typical transport and auth support per MCP client (as of 2026-05; follow each vendor’s latest docs). */
export function McpHostMatrix() {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#1c1c2e] bg-[#111118]">
      <table className="w-full min-w-[640px] text-left text-sm text-zinc-300">
        <caption className="sr-only">MCP host client capability matrix</caption>
        <thead>
          <tr className="border-b border-[#1c1c2e] text-zinc-400">
            <th className="p-3 font-medium">Client</th>
            <th className="p-3 font-medium">Notes</th>
            <th className="p-3 font-medium">stdio / local subprocess</th>
            <th className="p-3 font-medium">Remote SSE / HTTP</th>
            <th className="p-3 font-medium">OAuth-style sign-in tools</th>
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
        Capabilities change quickly; if this table disagrees with official docs, defer to Claude / Cursor / Windsurf /
        Codeium release notes.
      </p>
    </div>
  )
}
