'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import GameCard from '@/components/GameCard/GameCard'

interface Game {
  id: number
  name: string
  released: string
  background_image: string
  platforms: Platform[]
}

interface Platform {
  platform: {
    name: string
  }
}

const Home = () => {
  const [query, setQuery] = useState('')
  const [games, setGames] = useState<Game[]>([])
  const [page, setPage] = useState(1)
  const [favorites, setFavorites] = useState<Game[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const toggleFavorite = (game: Game) => {
    const isFavorite = favorites.some(favorite => favorite.id === game.id)
    const updatedFavorites = isFavorite
      ? favorites.filter(favorite => favorite.id !== game.id)
      : [...favorites, game]

    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  const queryRef = useRef(query)
  queryRef.current = query

  const cache = useRef(new Map())

  const fetchGames = useCallback(
    async (searchQuery: string, pageNumber: number) => {
      const cacheKey = `${searchQuery}-${pageNumber}`
      const cachedResults = cache.current.get(cacheKey)
      if (cachedResults) {
        setGames(cachedResults)
        return
      }
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuery}&page_size=10&page=${pageNumber}`
        )
        const data = await response.json()
        cache.current.set(searchQuery, data.results)
        if (!data.results || !Array.isArray(data.results)) {
          throw new Error('Invalid API response format')
        }
        setGames(prevGames => {
          const newGames = data.results.filter(
            (newGame: Game) => !prevGames.some(game => game.id === newGame.id)
          )
          return [...prevGames, ...newGames]
        })
        setHasMore(data.results.length > 0)
        setPage(prevPage => prevPage + 1)
      } catch (hasError) {
        // eslint-disable-next-line no-console
        console.error('Error fetching games:', hasError)
        setError('Failed to load games. Please try again later.')
      } finally {
        setLoading(false)
      }
    },
    []
  )

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (queryRef.current && queryRef.current.length >= 3) {
        setGames([])
        setPage(1)
        setHasMore(true)
        ;(async () => {
          try {
            await fetchGames(queryRef.current, 1)
          } catch (hasError) {
            // eslint-disable-next-line no-console
            console.error(hasError)
          }
        })()
      }
    }, 500)

    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    return () => clearTimeout(timerId)
  }, [query, fetchGames])

  return (
    <div className="mx-auto w-full max-w-screen-md px-4">
      <div className="mx-auto w-full max-w-screen-md px-4 py-8">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Welcome to Game Search
        </h1>
        <p className="mb-4 text-center text-lg">
          Explore a vast collection of video games.
        </p>
        <p className="mb-4 text-center text-lg">
          Use the input field below to search for games by name.
        </p>
        <p className="mb-4 text-center text-lg">
          Can&apos;t find what you&apos;re looking for?
        </p>
        <p className="mb-4 text-center text-lg">
          Click the <strong>&quot;Load More&quot;</strong> button to discover
          more games.
        </p>
        <p className="text-center text-lg">
          Dive deeper into your gaming adventure by adding games to your{' '}
          <strong>Favorites</strong>.
        </p>
        <p className="text-center text-lg">
          You can easily <strong>Add</strong> or <strong>Remove</strong> games
          from your favorites list for each game.
        </p>
      </div>
      <div className="my-4">
        <input
          type="text"
          placeholder="Search for a game..."
          className="w-full rounded-md border border-gray-300 p-4 text-black shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {!loading && games.length === 0 && query.length > 0 && (
        <div className="my-4 text-center">
          No game results found for &quot;{query}&quot;. Try a different search.
        </div>
      )}

      {error && <div className="my-4 text-center text-red-500">{error}</div>}

      {!error && (
        <>
          {loading && <div className="my-4 text-center">Loading games...</div>}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {games.map(game => (
              <GameCard
                key={game.id}
                game={game}
                toggleFavorite={toggleFavorite}
                isFavorite={id =>
                  favorites.some(favorite => favorite.id === id)
                }
              />
            ))}
          </div>
          {hasMore && (
            <div className="grid grid-cols-1">
              <button
                className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={() => fetchGames(query, page)}
                type="button"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home
