'use client'

import Image from 'next/image'
import React from 'react'

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

export interface GameCardProps {
  game: Game
  toggleFavorite: (game: Game) => void
  isFavorite: (id: number) => boolean
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  toggleFavorite,
  isFavorite,
}) => {
  return (
    <div className="flex flex-col rounded-md border border-gray-200 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-white">
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
            style={{ objectFit: 'cover' }}
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
          {isFavorite(game.id) ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  )
}

export default GameCard
