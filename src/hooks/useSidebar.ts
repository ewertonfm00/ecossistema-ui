import { useState, useCallback } from 'react'

export interface UseSidebarReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export function useSidebar(defaultOpen = false): UseSidebarReturn {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])
  return { isOpen, open, close, toggle }
}
