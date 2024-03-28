'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

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

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Game[]>([])

  const toggleFavorite = (game: Game) => {
    const isFavorite = favorites.some(favorite => favorite.id === game.id)
    const updatedFavorites = isFavorite
      ? favorites.filter(favorite => favorite.id !== game.id)
      : [...favorites, game]

    setFavorites(updatedFavorites)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem('favorites')
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites))
      }
    }

    if (typeof window !== 'undefined') {
      loadFavorites()
    }
  }, [])

  return (
    <div className="container mx-auto px-4">
      <h2 className="my-4 text-2xl font-bold">Favorite Games</h2>
      {favorites.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favorites.map(game => (
            <div
              key={game.id}
              className="flex flex-col rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-white"
            >
              {game.background_image && (
                <div
                  className="relative mb-2 w-full shrink-0"
                  style={{ paddingTop: '56.25%' }}
                >
                  <Image
                    src={game.background_image}
                    alt={game.name}
                    fill
                    className="rounded"
                    sizes="50vw"
                  />
                </div>
              )}
              <div className="flex grow flex-col">
                <h3 className="text-lg font-bold">{game.name}</h3>
                <p className="text-sm">Released: {game.released}</p>
                <div className="mt-auto text-sm">
                  Platforms:{' '}
                  {game.platforms?.length > 0
                    ? game.platforms.map(p => p.platform.name).join(', ')
                    : 'N/A'}
                </div>
                <button
                  onClick={() => toggleFavorite(game)}
                  className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-blue-700"
                  type="button"
                >
                  {favorites.some(favorite => favorite.id === game.id)
                    ? 'Remove from Favorites'
                    : 'Add to Favorites'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No favorite games added yet.</div>
      )}
    </div>
  )
}

export default Favorites
