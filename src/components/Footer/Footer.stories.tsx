import type { Meta, Story } from '@storybook/react'
import React from 'react'

import Footer from './Footer'

export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta

const Template: Story = args => <Footer {...args} />

export const Default = Template.bind({})
