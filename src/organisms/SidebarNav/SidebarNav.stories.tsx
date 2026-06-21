import type { Meta, StoryObj } from '@storybook/react'
import { SidebarNav } from './SidebarNav'

const navItems = [
  { label: 'Dashboard', icon: 'Shield', href: '#' },
  { label: 'Pacientes', icon: 'User', href: '#' },
  { label: 'Agendamentos', icon: 'Bell', href: '#' },
  { label: 'Relatórios', icon: 'AlertCircle', href: '#' },
  { label: 'Configurações', icon: 'Settings', href: '#' },
]

const meta: Meta<typeof SidebarNav> = {
  title: 'Organisms/SidebarNav',
  component: SidebarNav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof SidebarNav>

export const Expanded: Story = {
  render: () => (
    <div className="h-screen">
      <SidebarNav
        items={navItems}
        collapsed={false}
        logo={<span className="text-primary-700 font-bold text-lg">AIOX</span>}
      />
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div className="h-screen">
      <SidebarNav items={navItems} collapsed={true} />
    </div>
  ),
}

export const WithActiveItem: Story = {
  render: () => (
    <div className="h-screen">
      <SidebarNav
        items={[
          { label: 'Dashboard', icon: 'Shield', href: '#', active: true },
          { label: 'Pacientes', icon: 'User', href: '#' },
          { label: 'Agendamentos', icon: 'Bell', href: '#' },
          { label: 'Configurações', icon: 'Settings', href: '#', disabled: true },
        ]}
        logo={<span className="text-primary-700 font-bold text-lg">AIOX</span>}
      />
    </div>
  ),
}
