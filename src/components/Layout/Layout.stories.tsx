import React from 'react';
import { Story, Meta } from '@storybook/react';
import Layout from './Layout'; // Adjust the import path as necessary
import Header from '../Header/Header'; // Ensure these are correctly imported for the story
import Footer from '../Footer/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Optional: Import or define some mock components/content to display inside the Layout
const MockContent = () => (
  <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
    <p>This is a mock content area</p>
  </div>
);

export default {
  title: 'Components/Layout',
  component: Layout,
  subcomponents: { Header, Footer }, // Optional: if you want to document subcomponents in Storybook
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],

} as Meta;

const Template: Story = () => (
  <Layout>
    <MockContent /> {/* Directly placing MockContent or any other content here */}
  </Layout>
);

export const Default = Template.bind({});
Default.args = {
  children: <MockContent />, // Ensure this is recognized as fulfilling the `children` prop requirement
};

