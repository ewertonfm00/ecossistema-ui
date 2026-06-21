import { cn } from '@/lib/utils'

export interface AppShellProps {
  sidebar: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function AppShell({ sidebar, children, className }: AppShellProps) {
  return (
    <div className={cn('flex h-screen overflow-hidden bg-neutral-50', className)}>
      <aside className="flex-shrink-0" aria-label="Navegação lateral">
        {sidebar}
      </aside>
      <main id="main-content" className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
