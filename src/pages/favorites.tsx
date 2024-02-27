import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import Image from 'next/image'

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

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Game[]>([]);

  const toggleFavorite = (game: Game) => {
    const isFavorite = favorites.some(favorite => favorite.id === game.id);
    const updatedFavorites = isFavorite
      ? favorites.filter(favorite => favorite.id !== game.id)
      : [...favorites, game];

    setFavorites(updatedFavorites);
    // Safe to call localStorage here since this code runs in response to a user action/event
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };

    if (typeof window !== "undefined") {
      loadFavorites();
    }
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold my-4">Favorite Games</h2>
        {favorites.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {favorites.map((game, index) => (
              <div
                key={`${game.id}-${index}`}
                className="game-item flex flex-col p-4 border border-gray-200 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                {game.background_image && (
                  <div className="flex-shrink-0 relative w-full mb-2"
                       style={{ paddingTop: '56.25%' }}> {/* This sets an aspect ratio */}
                    <Image
                      src={game.background_image}
                      alt={game.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
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
                    {favorites.some(favorite => favorite.id === game.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No favorite games added yet.</div>
        )}
      </div>
    </Layout>
  );
};

export default Favorites;
