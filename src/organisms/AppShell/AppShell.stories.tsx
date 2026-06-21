import type { Meta, StoryObj } from '@storybook/react'
import { AppShell } from './AppShell'
import { SidebarNav } from '../SidebarNav'

const navItems = [
  { label: 'Dashboard', icon: 'Shield', href: '#', active: true },
  { label: 'Pacientes', icon: 'User', href: '#' },
  { label: 'Agendamentos', icon: 'Bell', href: '#' },
  { label: 'Configurações', icon: 'Settings', href: '#' },
]

const meta: Meta<typeof AppShell> = {
  title: 'Organisms/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof AppShell>

export const Default: Story = {
  args: {
    sidebar: (
      <div className="w-60 h-full bg-white border-r border-neutral-200 flex items-center justify-center">
        <span className="text-sm text-neutral-400">Sidebar</span>
      </div>
    ),
    children: (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Conteúdo principal</h1>
        <p className="text-neutral-600 mt-2">Área de conteúdo do AppShell</p>
      </div>
    ),
  },
}

export const WithSidebarNav: Story = {
  render: () => (
    <AppShell
      sidebar={
        <SidebarNav
          items={navItems}
          logo={<span className="text-primary-700 font-bold text-lg">AIOX</span>}
        />
      }
    >
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Bem-vindo ao sistema clínico.</p>
      </div>
    </AppShell>
  ),
}
