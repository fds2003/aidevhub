import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface ToolRow {
  id: string
  slug: string
  name: string
  description: string
  long_description: string | null
  category: string
  tags: string[]
  website: string
  affiliate_url: string | null
  pricing: 'free' | 'freemium' | 'paid' | 'open-source'
  logo: string | null
  features: string[] | null
  pros: string[] | null
  cons: string[] | null
  alternatives: string[] | null
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface PostRow {
  id: string
  slug: string
  title: string
  description: string
  content: string | null
  category: string
  tags: string[]
  author: string | null
  cover_image: string | null
  reading_time: number | null
  created_at: string
  updated_at: string
  published_at: string | null
  featured: boolean
}

export interface WorkflowRow {
  id: string
  slug: string
  title: string
  description: string
  content: string | null
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string | null
  tools: string[]
  steps: Record<string, unknown>[]
  created_at: string
  updated_at: string
  published_at: string | null
  featured: boolean
}

// CRUD operations
export async function getTools() {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data
}

export async function getToolBySlug(slug: string) {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export async function getPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

export async function getWorkflows() {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .order('published_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getWorkflowBySlug(slug: string) {
  const { data, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (error) throw error
  return data
}

// Create operations
export async function createTool(tool: Omit<ToolRow, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('tools')
    .insert(tool)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function createPost(post: Omit<PostRow, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Update operations
export async function updateTool(slug: string, updates: Partial<ToolRow>) {
  const { data, error } = await supabase
    .from('tools')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('slug', slug)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function updatePost(slug: string, updates: Partial<PostRow>) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('slug', slug)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete operations
export async function deleteTool(slug: string) {
  const { error } = await supabase
    .from('tools')
    .delete()
    .eq('slug', slug)
  
  if (error) throw error
}

export async function deletePost(slug: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('slug', slug)
  
  if (error) throw error
}
