import type { StorybookConfig } from '@storybook/react-vite'
import { resolve } from 'node:path'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async baseConfig =>
    mergeConfig(baseConfig, {
      resolve: {
        alias: { '@': resolve(__dirname, '../src') },
      },
    }),
}

export default config
