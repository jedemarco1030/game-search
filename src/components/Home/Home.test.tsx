import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'

import Home from './Home'

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          {
            id: 1,
            name: 'Test Game',
            released: '2020-01-01',
            background_image: '',
            platforms: [{ platform: { name: 'PC' } }],
          },
        ],
      }),
  })
) as jest.Mock

describe('Home Component', () => {
  test('initial render and fetch games', async () => {
    render(<Home />)
    expect(screen.getByText('Welcome to Game Search')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Search for a game...'), {
      target: { value: 'Mario' },
    })

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByText('Test Game')).toBeInTheDocument()
  })

  test('load more games on button click', async () => {
    render(<Home />)

    const loadMoreButton = screen.getByText('Load More')
    fireEvent.click(loadMoreButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
    })
  })
})
