import type { Meta, Story } from '@storybook/react'
import React from 'react'

import { ThemeProvider } from '@/contexts/ThemeContext'

import Header from './Header'

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta

const Template: Story = args => <Header {...args} />

export const Default = Template.bind({})
