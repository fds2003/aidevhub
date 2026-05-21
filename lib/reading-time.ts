/**
 * Reading Time Calculator
 * Estimates reading time for blog posts
 */

const AVERAGE_READING_SPEED = 200 // words per minute

/**
 * Calculate estimated reading time for content
 */
export function calculateReadingTime(content: string): number {
  if (!content) return 0

  // Strip markdown syntax
  const strippedContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/#{1,6}\s/g, '') // Remove headings
    .replace(/[*_~`]/g, '') // Remove formatting characters
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()

  // Count words
  const words = strippedContent.split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length

  // Count code lines (rough estimate)
  const codeBlockCount = (content.match(/```[\s\S]*?```/g) || []).length
  const codeLines = codeBlockCount * 10 // Assume average 10 lines per code block
  const codeWordEquivalent = codeLines * 2 // Each line ≈ 2 words

  // Total adjusted word count
  const adjustedWordCount = wordCount + codeWordEquivalent

  // Calculate minutes
  const minutes = Math.ceil(adjustedWordCount / AVERAGE_READING_SPEED)

  return Math.max(1, minutes) // Minimum 1 minute
}

/**
 * Format reading time for display
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return '1 min read'
  if (minutes === 1) return '1 min read'
  return `${minutes} min read`
}

/**
 * Get word count from content
 */
export function getWordCount(content: string): number {
  if (!content) return 0

  const strippedContent = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/[*_~`]/g, '')
    .replace(/\n/g, ' ')
    .trim()

  const words = strippedContent.split(/\s+/).filter((word) => word.length > 0)
  return words.length
}
