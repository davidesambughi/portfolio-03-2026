interface SectionDividerProps {
  label: string
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative flex items-center px-4 md:px-8 lg:px-12">
      {/* Label sits above the line */}
      <span className="relative z-10 pr-4 bg-background text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50 dark:text-primary/70">
        {label}
      </span>
      {/* Line */}
      <div className="flex-1 h-px" style={{ backgroundImage: 'var(--gradient-brand-h)' }} />
    </div>
  )
}
