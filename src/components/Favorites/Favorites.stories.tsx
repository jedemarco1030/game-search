import type { Meta, StoryObj } from '@storybook/react'

import Favorites from './Favorites'

const meta: Meta<typeof Favorites> = {
  component: Favorites,
}

export default meta
type Story = StoryObj<typeof Favorites>

export const FirstStory: Story = {
  args: {},
}
