import { ThemeToggle } from '@/components/layout/ThemeToggle'

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeToggle />
      <div className="flex-1">
        {children}
      </div>
    </>
  )
}
