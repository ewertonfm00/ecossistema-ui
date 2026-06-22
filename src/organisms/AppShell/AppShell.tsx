import React from 'react'
import { cn } from '@/lib/utils'
import { Drawer } from '../Drawer/Drawer'

export interface AppShellProps {
  sidebar: React.ReactNode
  children: React.ReactNode
  className?: string
  header?: React.ReactNode
  sidebarOpen?: boolean
  onSidebarClose?: () => void
  sidebarWidth?: string
}

export function AppShell({
  sidebar,
  children,
  className,
  header,
  sidebarOpen = false,
  onSidebarClose,
  sidebarWidth = 'w-64',
}: AppShellProps) {
  return (
    <div className={cn('flex flex-col h-screen overflow-hidden bg-neutral-50', className)}>
      {header && (
        <div className="shrink-0">
          {header}
        </div>
      )}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar desktop — oculta abaixo de lg */}
        <aside
          className={cn('hidden lg:flex flex-col shrink-0 border-r border-neutral-200 bg-white', sidebarWidth)}
          aria-label="Navegação lateral"
        >
          {sidebar}
        </aside>

        {/* Sidebar mobile — Drawer */}
        <Drawer
          open={sidebarOpen}
          onClose={onSidebarClose ?? (() => {})}
          title=""
          side="left"
          width="sm"
          hideCloseButton
        >
          {sidebar}
        </Drawer>

        <main id="main-content" className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
