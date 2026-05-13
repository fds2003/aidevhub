/** MCP 宿主客户端对某服务器的典型接入方式（非官方认证，仅供选型参考） */
export type MCPHostLevel = 'native' | 'stdio' | 'limited' | 'unknown'

export type MCPServerCategory = 'official' | 'community' | 'commercial'

export interface MCPServerHosts {
  /** Claude Code / `claude mcp` 配置 */
  claudeCode: MCPHostLevel
  /** Claude Desktop JSON 配置 */
  claudeDesktop: MCPHostLevel
  /** Cursor MCP 设置 */
  cursor: MCPHostLevel
  /** Windsurf / Cascade MCP */
  windsurf: MCPHostLevel
}

export interface MCPServerEntry {
  slug: string
  name: string
  /** 一句话 */
  summary: string
  category: MCPServerCategory
  /** npm / PyPI 安装或文档指引；以 `npx` / `uvx` 为主 */
  installCommand: string
  /** 典型使用场景（短句列表） */
  useCases: string[]
  repository: string
  /** npm 包名（若有），便于检索 */
  packageName?: string
  hosts: MCPServerHosts
  tags?: string[]
}
