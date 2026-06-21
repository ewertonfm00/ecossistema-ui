import type { Meta, StoryObj } from '@storybook/react'
import { EmptyPage } from './EmptyPage'

const meta: Meta<typeof EmptyPage> = {
  title: 'Pages/EmptyPage',
  component: EmptyPage,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof EmptyPage>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
