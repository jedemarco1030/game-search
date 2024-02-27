import React, { ReactNode } from 'react'
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header'; // Adjust the import path as necessary
import { ThemeProvider, ThemeContext } from '@/contexts/ThemeContext'; // Adjust the import path for your context provider

interface WrapperProps {
  children: ReactNode;
}

// Mock the ThemeContext to test the Toggle Theme functionality
const toggleTheme = jest.fn();

// Override the ThemeProvider for testing
const TestThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={{ theme: 'light', toggleTheme }}>
    {children}
  </ThemeContext.Provider>
);

describe('Header Component', () => {
  const wrapper: React.FC<WrapperProps> = ({ children }) => (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );

  it('renders correctly', () => {
    render(<Header />, { wrapper });
    expect(screen.getByText('Game Search')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Favorites')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('toggles the menu on button click', () => {
    render(<Header />, { wrapper });
    const menuButton = screen.getByText('Menu');
    fireEvent.click(menuButton);
    // After menu is opened
    expect(screen.getByText('Favorites')).toBeVisible();
    // Close the menu
    fireEvent.click(menuButton);
    // You might need to adjust this depending on how your menu is implemented
    // This example assumes the menu visibility toggles on click
  });

  it('calls the toggleTheme function when the Toggle Theme button is clicked', () => {
    render(<Header />, { wrapper: TestThemeProvider });
    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
