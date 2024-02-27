// Header.stories.tsx
import React from 'react';
import { Story, Meta } from '@storybook/react';
import Header from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext'; // Adjust the import path as necessary

export default {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Default = Template.bind({});
