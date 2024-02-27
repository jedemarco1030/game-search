import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout'; // Adjust the import path as necessary

describe('Layout Component', () => {
  it('renders its children', () => {
    render(
      <Layout>
        <div data-testid="child">Child Component</div>
      </Layout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders the Header and Footer components', () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );
    // Assuming Header and Footer have distinctive text or roles you can target
    // If you've mocked Header and Footer, adjust these to match the mock text or roles
    expect(screen.getByText('Mock Header')).toBeInTheDocument(); // Assuming <Header /> contains a <header> with a 'banner' role
    expect(screen.getByText('Mock Footer')).toBeInTheDocument(); // Assuming <Header /> contains a <header> with a 'banner' role
  });
});
