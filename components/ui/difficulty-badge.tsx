import { Badge } from './badge'
import { cn } from '@/lib/utils'

type Difficulty = 'beginner' | 'intermediate' | 'advanced'

interface DifficultyBadgeProps {
  difficulty: Difficulty
  className?: string
}

const difficultyConfig: Record<Difficulty, { variant: 'success' | 'warning' | 'destructive'; label: string }> = {
  beginner: { variant: 'success', label: 'Beginner' },
  intermediate: { variant: 'warning', label: 'Intermediate' },
  advanced: { variant: 'destructive', label: 'Advanced' },
}

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty]

  return (
    <Badge variant={config.variant} className={cn('capitalize', className)}>
      {config.label}
    </Badge>
  )
}
