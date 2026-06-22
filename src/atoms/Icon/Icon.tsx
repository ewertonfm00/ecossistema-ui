import {
  AlertCircle, AlertTriangle, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  Eye, EyeOff, Info, Loader2, Search, Shield, Sparkles,
  User, X, XCircle, Menu, Bell, Settings, LogOut,
  MoreHorizontal, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ArrowUpDown, Plus, Trash2,
  Edit, Upload, Download, Inbox,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  AlertCircle, AlertTriangle, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  Eye, EyeOff, Info, Loader2, Search, Shield, Sparkles,
  User, X, XCircle, Menu, Bell, Settings, LogOut,
  MoreHorizontal, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ArrowUpDown, Plus, Trash2,
  Edit, Upload, Download, Inbox,
}

export interface IconProps {
  name: string
  size?: number
  className?: string
  'aria-label'?: string
  'aria-hidden'?: boolean
}

export function Icon({ name, size = 16, className, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden = true }: IconProps) {
  const LucideComponent = iconMap[name]

  if (!LucideComponent) {
    return <span aria-hidden="true" />
  }

  return (
    <LucideComponent
      size={size}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ? true : undefined}
    />
  )
}
