import type { MCPServerEntry } from '@/types/mcp-directory'
import { MCP_HOST_MATRIX_ROWS, MCP_SERVERS } from './mcp-directory-data'

export function getAllMCPServers(): MCPServerEntry[] {
  return MCP_SERVERS
}

export function getMCPServerBySlug(slug: string): MCPServerEntry | undefined {
  return MCP_SERVERS.find((s) => s.slug === slug)
}

export function getMCPServerSlugs(): string[] {
  return MCP_SERVERS.map((s) => s.slug)
}

export function getMcpDirectoryStats() {
  const official = MCP_SERVERS.filter((s) => s.category === 'official').length
  const community = MCP_SERVERS.filter((s) => s.category === 'community').length
  const commercial = MCP_SERVERS.filter((s) => s.category === 'commercial').length
  return { total: MCP_SERVERS.length, official, community, commercial }
}

export { MCP_HOST_MATRIX_ROWS }
