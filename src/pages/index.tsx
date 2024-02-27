// src/pages/index.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '@/components/Layout/Layout';
import GameCard from '@/components/GameCard/GameCard'

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


const Home = () => {
  const [query, setQuery] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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


  const queryRef = useRef(query);
  queryRef.current = query;

  const cache = useRef(new Map());

  const fetchGames = useCallback(async (searchQuery: string, pageNumber: number) => {
    const cacheKey = `${searchQuery}-${pageNumber}`;
    const cachedResults = cache.current.get(cacheKey);
    if (cachedResults) {
      setGames(cachedResults);
      return; // Skip fetching
    }
    setLoading(true);
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${searchQuery}&page_size=10&page=${pageNumber}`);
      const data = await response.json();
      // After fetching, cache the results
      cache.current.set(searchQuery, data.results);
      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid API response format');
      }
      setGames(prevGames => {
        const newGames = data.results.filter((newGame: Game) => !prevGames.some(game => game.id === newGame.id));
        return [...prevGames, ...newGames];
      });
      setHasMore(data.results.length > 0);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error("Error fetching games:", error);
      setError('Failed to load games. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (queryRef.current && queryRef.current.length >= 3) {
        setGames([]);
        setPage(1);
        setHasMore(true);
        // Async IIFE
        (async () => {
          try {
            await fetchGames(queryRef.current, 1);
            // Handle successful fetch if needed
          } catch (error) {
            console.error(error); // Handle any errors
          }
        })();
      }
    }, 500);

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    return () => clearTimeout(timerId);
  }, [query, fetchGames]);


  return (
    <Layout>
      <div className="mx-auto px-4 w-full max-w-screen-md">
        <div className="mx-auto px-4 py-8 w-full max-w-screen-md">
          <h1 className="text-3xl font-bold text-center mb-4">Welcome to Game Search</h1>
          <p className="text-lg text-center mb-4">
            Explore a vast collection of video games.
          </p>
          <p className="text-lg text-center mb-4">
            Use the input field below to search for games by name.
          </p>
          <p className="text-lg text-center mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <p className="text-lg text-center mb-4">
            Click the <strong>&quot;Load More&quot;</strong> button to discover more games.
          </p>
          <p className="text-lg text-center">
            Dive deeper into your gaming adventure by adding games to your <strong>Favorites</strong>.
          </p>
          <p className="text-lg text-center">
            You can easily <strong>Add</strong> or <strong>Remove</strong> games from your favorites list for each game.
          </p>
        </div>
        <div className="search-bar my-4">
          <input
            type="text"
            placeholder="Search for a game..."
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {!loading && games.length === 0 && query.length > 0 && (
          <div className="text-center my-4">No game results found for &quot;{query}&quot;. Try a different search.</div>
        )}

        {/* Error Message Display */}
        {error && <div className="my-4 text-center text-red-500">{error}</div>}

        {/* Conditional rendering: if there's no error, show loading or results */}
        {!error && (
          <>
            {loading && <div className="text-center my-4">Loading games...</div>}
            <div className="games-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  toggleFavorite={toggleFavorite}
                  isFavorite={(id) => favorites.some(favorite => favorite.id === id)}
                />
              ))}
            </div>
            {hasMore && (
              <div className="grid grid-cols-1">
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => fetchGames(query, page)}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
