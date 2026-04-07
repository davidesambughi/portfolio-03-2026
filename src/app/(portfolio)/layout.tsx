import { Sidebar } from '@/components/layout/Sidebar'
import { ThemeToggle } from '@/components/layout/ThemeToggle'

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-background focus:border focus:border-border focus:text-foreground focus:shadow-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Sidebar />
      <ThemeToggle />
      {/* pl-14 = 56px — collapsed sidebar width, must match SIDEBAR_COLLAPSED in Sidebar.tsx */}
      <div className="flex-1 md:pl-14">
        {children}
      </div>
    </>
  )
}
