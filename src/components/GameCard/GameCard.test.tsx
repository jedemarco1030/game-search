import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import GameCard from './GameCard' // Adjust the import path as necessary

const mockGame = {
  id: 1,
  name: 'Test Game',
  released: '2020-01-01',
  background_image: 'https://example.com/image.jpg',
  platforms: [{ platform: { name: 'PC' } }, { platform: { name: 'Xbox' } }],
}

const toggleFavoriteMock = jest.fn()
const isFavoriteMock = jest.fn()

describe('GameCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly with game data', () => {
    render(
      <GameCard
        game={mockGame}
        toggleFavorite={toggleFavoriteMock}
        isFavorite={() => false}
      />
    )

    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByText('Released: 2020-01-01')).toBeInTheDocument()
    expect(screen.getByText('Platforms: PC, Xbox')).toBeInTheDocument()
    expect(screen.getByText('Add to Favorites')).toBeInTheDocument()
    const imageUrl = 'https://example.com/image.jpg'
    const encodedUrl = encodeURIComponent(imageUrl)
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining(encodedUrl)
    )
  })

  it('displays "Remove from Favorites" when the game is a favorite', () => {
    render(
      <GameCard
        game={mockGame}
        toggleFavorite={toggleFavoriteMock}
        isFavorite={() => true}
      />
    )

    expect(screen.getByText('Remove from Favorites')).toBeInTheDocument()
  })

  it('calls toggleFavorite when the button is clicked', async () => {
    render(
      <GameCard
        game={mockGame}
        toggleFavorite={toggleFavoriteMock}
        isFavorite={isFavoriteMock}
      />
    )

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockGame)
  })
})
