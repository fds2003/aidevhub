/** Typical wiring level for a host against a given server (not vendor-certified; triage only). */
export type MCPHostLevel = 'native' | 'stdio' | 'limited' | 'unknown'

export type MCPServerCategory = 'official' | 'community' | 'commercial'

export interface MCPServerHosts {
  /** Claude Code / `claude mcp` configuration */
  claudeCode: MCPHostLevel
  /** Claude Desktop JSON configuration */
  claudeDesktop: MCPHostLevel
  /** Cursor MCP settings */
  cursor: MCPHostLevel
  /** Windsurf / Cascade MCP */
  windsurf: MCPHostLevel
}

export interface MCPServerEntry {
  slug: string
  name: string
  /** One-line summary */
  summary: string
  category: MCPServerCategory
  /** npm / PyPI install or doc pointer; usually `npx` / `uvx` */
  installCommand: string
  /** Typical use cases (short bullets) */
  useCases: string[]
  repository: string
  /** npm package name when applicable (search aid) */
  packageName?: string
  hosts: MCPServerHosts
  tags?: string[]
}
