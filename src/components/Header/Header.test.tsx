import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import type { ReactNode } from 'react'
import React, { useMemo } from 'react'

import { ThemeContext, ThemeProvider } from '@/contexts/ThemeContext'

import Header from './Header'

interface WrapperProps {
  children: ReactNode
}

const toggleTheme = jest.fn()

const TestThemeProvider = ({ children }: { children: ReactNode }) => {
  enum Theme {
    Light = 'light',
    Dark = 'dark',
  }

  const themeValue: Theme = Theme.Light

  const value = useMemo(
    () => ({ theme: themeValue, toggleTheme }),
    [themeValue]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

describe('Header Component', () => {
  const wrapper: React.FC<WrapperProps> = ({ children }) => (
    <ThemeProvider>{children}</ThemeProvider>
  )

  it('renders correctly', () => {
    render(<Header />, { wrapper })
    expect(screen.getByText('Game Search')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Favorites')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('toggles the menu on button click', () => {
    render(<Header />, { wrapper })
    const menuButton = screen.getByText('Menu')
    fireEvent.click(menuButton)
    expect(screen.getByText('Favorites')).toBeVisible()
    fireEvent.click(menuButton)
  })

  it('calls the toggleTheme function when the Toggle Theme button is clicked', () => {
    render(<Header />, { wrapper: TestThemeProvider })
    const toggleButton = screen.getByText('Toggle Theme')
    fireEvent.click(toggleButton)
    expect(toggleTheme).toHaveBeenCalledTimes(1)
  })
})
