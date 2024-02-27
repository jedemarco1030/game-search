import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer/Footer';

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(<Footer />);
    expect(screen.getByText(`© ${new Date().getFullYear()} Game Search. All rights reserved.`)).toBeInTheDocument();
  });
});
