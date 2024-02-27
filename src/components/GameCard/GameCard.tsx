import React from 'react';
import Image from 'next/image';

// Assuming Game and Platform types are defined elsewhere
interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  platforms: Platform[];
}

interface Platform {
  platform: {
    name: string;
  };
}

export interface GameCardProps {
  game: Game;
  toggleFavorite: (game: Game) => void;
  isFavorite: (id: number) => boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, toggleFavorite, isFavorite }) => {
  return (
    <div
      className="game-item flex flex-col p-4 border border-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      {game.background_image && (
        <div className="flex-shrink-0 relative w-full mb-2" style={{ paddingTop: '56.25%' }}>
          <Image
            src={game.background_image}
            alt={game.name}
            fill={true}
            className="rounded"
            style={{objectFit: "cover"}}
          />
        </div>
      )}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold">{game.name}</h3>
        <p className="text-sm">Released: {game.released}</p>
        <div className="text-sm mt-auto">
          Platforms: {game.platforms?.length > 0 ? game.platforms.map(p => p.platform.name).join(', ') : 'N/A'}
        </div>
        <button
          onClick={() => toggleFavorite(game)}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          {isFavorite(game.id) ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default GameCard;
