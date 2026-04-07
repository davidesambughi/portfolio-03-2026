import { cn } from '@/lib/utils'
import type { ProjectStatus } from '@/data/case-studies/types'

const STATUS_STYLES: Record<ProjectStatus, { dot: string; badge: string }> = {
  LIVE:    { dot: 'bg-emerald-500', badge: 'border-emerald-500/40 text-emerald-500 bg-emerald-500/6' },
  WIP:     { dot: 'bg-amber-500',   badge: 'border-amber-500/40 text-amber-500 bg-amber-500/6' },
  SHIPPED: { dot: 'bg-cyan-500',    badge: 'border-cyan-500/40 text-cyan-500 bg-cyan-500/6' },
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const { dot, badge } = STATUS_STYLES[status]
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full',
      'text-[10px] font-semibold tracking-widest uppercase border shrink-0',
      badge,
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', dot)} />
      {status}
    </span>
  )
}

export type { ProjectStatus }
