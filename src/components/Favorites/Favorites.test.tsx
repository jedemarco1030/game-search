import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import Favorites from './Favorites'

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => {
    return 'Next image stub'
  },
}))

describe('Favorites', () => {
  const mockFavorites = [
    {
      id: 1,
      name: 'Game 1',
      released: '2021-01-01',
      background_image: 'http://example.com/image1.png',
      platforms: [{ platform: { name: 'PC' } }],
    },
    {
      id: 2,
      name: 'Game 2',
      released: '2021-02-01',
      background_image: 'http://example.com/image2.png',
      platforms: [{ platform: { name: 'Xbox' } }],
    },
  ]

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('loads favorites from localStorage on render', () => {
    localStorage.setItem('favorites', JSON.stringify(mockFavorites))
    render(<Favorites />)
    expect(screen.getByText('Game 1')).toBeInTheDocument()
    expect(screen.getByText('Game 2')).toBeInTheDocument()
  })

  it('displays "No favorite games added yet." when there are no favorites', () => {
    render(<Favorites />)
    expect(screen.getByText('No favorite games added yet.')).toBeInTheDocument()
  })

  it('allows toggling favorites', () => {
    localStorage.setItem('favorites', JSON.stringify(mockFavorites))
    render(<Favorites />)

    const removeButton = screen.getAllByText('Remove from Favorites')[0]
    fireEvent.click(removeButton)

    const updatedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    )
    expect(updatedFavorites.length).toBe(1)
    expect(updatedFavorites.find((game: any) => game.id === 1)).toBeUndefined()
  })
})
