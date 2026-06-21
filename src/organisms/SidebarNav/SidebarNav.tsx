import { cn } from '@/lib/utils'
import { Icon } from '../../atoms/Icon/Icon'

export interface SidebarNavItem {
  label: string
  icon: string
  href: string
  active?: boolean
  disabled?: boolean
}

export interface SidebarNavProps {
  items: SidebarNavItem[]
  logo?: React.ReactNode
  collapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
}

export function SidebarNav({ items, logo, collapsed, onToggleCollapse, className }: SidebarNavProps) {
  return (
    <nav
      aria-label="Menu principal"
      className={cn(
        'flex flex-col h-full bg-white border-r border-neutral-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
        className
      )}
    >
      {logo && (
        <div className="flex items-center h-16 px-4 border-b border-neutral-100">
          {logo}
        </div>
      )}
      <ul className="flex-1 px-2 py-4 space-y-1">
        {items.map(item => (
          <li key={item.href}>
            <a
              href={item.href}
              aria-current={item.active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                item.active
                  ? 'bg-primary-50 text-primary-700 font-medium'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
                item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
              )}
            >
              <Icon name={item.icon} size={18} className="flex-shrink-0" />
              <span className={cn(collapsed && 'sr-only')}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="p-2 border-t border-neutral-100">
        <button
          onClick={onToggleCollapse}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          className="w-full flex justify-center p-2 rounded-md hover:bg-neutral-100 text-neutral-500"
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size={18} />
        </button>
      </div>
    </nav>
  )
}
