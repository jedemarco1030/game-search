import React from 'react';
import { Story, Meta } from '@storybook/react';
import Footer from './Footer'; // Adjust the import path as necessary

// Here we define metadata for the story, including the component and title
export default {
  title: 'Components/Footer',
  component: Footer,
} as Meta;

// Template for creating your stories
const Template: Story = (args) => <Footer {...args} />;

// Default story
export const Default = Template.bind({});
// Default.args = {}; // Define props if your component accepts any, for Footer it's likely not needed
