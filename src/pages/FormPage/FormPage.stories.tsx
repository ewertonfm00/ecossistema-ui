import type { Meta, StoryObj } from '@storybook/react'
import { FormPage } from './FormPage'

const meta: Meta<typeof FormPage> = {
  title: 'Pages/FormPage',
  component: FormPage,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof FormPage>

export const Default: Story = {}
