import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FileUpload } from './FileUpload'

const meta: Meta<typeof FileUpload> = {
  title: 'Molecules/FileUpload',
  component: FileUpload,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <div className="max-w-lg space-y-4">
        <FileUpload onFiles={setFiles} accept="image/*" multiple />
        {files.length > 0 && (
          <p className="text-sm text-neutral-600">{files.length} arquivo(s) selecionado(s)</p>
        )}
      </div>
    )
  },
}

export const SingleFile: Story = {
  render: () => (
    <div className="max-w-lg">
      <FileUpload
        onFiles={files => console.log(files)}
        multiple={false}
        accept="application/pdf,image/*"
        maxSize={5 * 1024 * 1024}
      />
    </div>
  ),
}
