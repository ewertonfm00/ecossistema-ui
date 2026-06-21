import type { Meta, StoryObj } from '@storybook/react'
import { ListingPage } from './ListingPage'

const meta: Meta<typeof ListingPage> = {
  title: 'Pages/ListingPage',
  component: ListingPage,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof ListingPage>

export const Default: Story = {}
export const Loading: Story = { args: { loading: true } }
