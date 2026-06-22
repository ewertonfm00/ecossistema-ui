import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageHeaderProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ title, breadcrumbs, actions, className }: PageHeaderProps) {
  return (
    <header className={cn('flex items-start justify-between px-6 py-4 border-b border-neutral-200 bg-white', className)}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm text-neutral-500 mb-1">
              {breadcrumbs.map((item, i) => {
                const isLast = i === breadcrumbs.length - 1
                const isFirstOfMany = i === 0 && breadcrumbs.length > 2
                const isMiddle = i > 0 && !isLast

                if (isMiddle) {
                  return (
                    <li key={i} className="hidden md:flex items-center gap-1">
                      <span aria-hidden="true" className="text-neutral-300">/</span>
                      {item.href ? (
                        <a href={item.href} className="hover:text-neutral-900 hover:underline">{item.label}</a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </li>
                  )
                }

                return (
                  <li key={i} className="flex items-center gap-1">
                    {i > 0 && (
                      <span aria-hidden="true" className="text-neutral-300">/</span>
                    )}
                    {isFirstOfMany && (
                      <span aria-hidden="true" className="md:hidden text-neutral-400">…</span>
                    )}
                    {isLast || !item.href ? (
                      <span
                        aria-current={isLast ? 'page' : undefined}
                        className={cn(isLast ? 'text-neutral-900' : '', isFirstOfMany ? 'hidden md:inline' : '')}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <a
                        href={item.href}
                        className={cn('hover:text-neutral-900 hover:underline', isFirstOfMany ? 'hidden md:inline' : '')}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        )}
        <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  )
}
