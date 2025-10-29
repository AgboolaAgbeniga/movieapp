import React from 'react';
import useGenres from '../hooks/useGenres';

const GenreFilter = ({ selectedGenres, onGenreChange, type = 'movie' }) => {
  const { genres, loading, error } = useGenres(type);

  if (loading) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Genres</h3>
        <p className="text-red-500 text-sm">Failed to load genres</p>
      </div>
    );
  }

  const handleGenreToggle = (genreId) => {
    const newSelected = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    onGenreChange(newSelected);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Genres</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map(genre => (
          <button
            key={genre.id}
            onClick={() => handleGenreToggle(genre.id)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedGenres.includes(genre.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>
      {selectedGenres.length > 0 && (
        <button
          onClick={() => onGenreChange([])}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default GenreFilter;