import type { Meta, Story } from '@storybook/react'
import React from 'react'

import GameCard from './GameCard' // Adjust the import path as necessary

export default {
  title: 'Components/GameCard',
  component: GameCard,
} as Meta<typeof GameCard>

const Template: Story<typeof GameCard> = args => <GameCard {...args} />

export const Default = Template.bind({})
Default.args = {
  game: {
    id: 1,
    name: 'Example Game',
    released: '2021-07-16',
    background_image: 'https://via.placeholder.com/400x225',
    platforms: [
      { platform: { name: 'PC' } },
      { platform: { name: 'PlayStation 5' } },
    ],
  },
  // eslint-disable-next-line no-console
  toggleFavorite: () => console.log('Toggle favorite'),
  isFavorite: () => false,
}

export const Favorited = Template.bind({})
Favorited.args = {
  ...Default.args,
  isFavorite: () => true,
}
