import Link from 'next/link'
import { Boxes, Book, Server, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata = {
  title: 'MCP Ecosystem',
  description: 'Explore the Model Context Protocol ecosystem, servers, tutorials, and use cases.',
}

const mcpServers = [
  {
    name: 'Filesystem',
    description: 'Read and write files on your local filesystem',
    repository: 'https://github.com/modelcontextprotocol/servers/tree/main/filesystem',
  },
  {
    name: 'GitHub',
    description: 'Interact with GitHub repositories, issues, and pull requests',
    repository: 'https://github.com/modelcontextprotocol/servers/tree/main/github',
  },
  {
    name: 'Slack',
    description: 'Send messages and manage Slack channels',
    repository: 'https://github.com/modelcontextprotocol/servers/tree/main/slack',
  },
  {
    name: 'Brave Search',
    description: 'Search the web using Brave Search API',
    repository: 'https://github.com/modelcontextprotocol/servers/tree/main/brave-search',
  },
]

const tutorials = [
  {
    title: 'Getting Started with MCP',
    description: 'Learn the basics of MCP and how to set up your first server.',
    href: '/blog/getting-started-mcp',
  },
  {
    title: 'Building Custom MCP Servers',
    description: 'Create your own MCP server for custom functionality.',
    href: '/blog/building-custom-mcp-servers',
  },
]

export default function MCPPage() {
  return (
    <div className="container py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Boxes className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">MCP Ecosystem</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          The Model Context Protocol (MCP) is an open protocol that enables AI models
          to connect with external tools, data sources, and services. Explore servers,
          tutorials, and use cases.
        </p>
      </div>

      {/* What is MCP */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What is MCP?</h2>
        <Card>
          <CardContent className="prose prose-lg max-w-none p-6">
            <p>
              MCP (Model Context Protocol) is a standardization effort that allows AI models
              to interact with external tools and data sources in a consistent way. Instead of
              building custom integrations for each tool, developers can build MCP servers that
              work with any MCP-compatible client.
            </p>
            <h3>Key Benefits</h3>
            <ul>
              <li><strong>Standardization</strong>: One protocol for all tool integrations</li>
              <li><strong>Extensibility</strong>: Build custom servers for your needs</li>
              <li><strong>Interoperability</strong>: Works across different AI platforms</li>
              <li><strong>Security</strong>: Sandboxed tool execution</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Popular MCP Servers */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Server className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Popular MCP Servers</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mcpServers.map((server) => (
            <Card key={server.name}>
              <CardHeader>
                <CardTitle className="text-lg">{server.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{server.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href={server.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tutorials */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Book className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Tutorials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{tutorial.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                <Button asChild>
                  <Link href={tutorial.href}>Read Tutorial</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Get Started */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6">
          Check out our detailed guide on getting started with MCP.
        </p>
        <Button asChild>
          <Link href="/blog/getting-started-mcp">
            Read the Guide
          </Link>
        </Button>
      </section>
    </div>
  )
}
