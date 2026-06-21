import type { Meta, StoryObj } from '@storybook/react'
import { DashboardPage } from './DashboardPage'

const meta: Meta<typeof DashboardPage> = {
  title: 'Pages/DashboardPage',
  component: DashboardPage,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof DashboardPage>

export const Default: Story = {}
export const WithUserName: Story = { args: { userName: 'Ewerton' } }
