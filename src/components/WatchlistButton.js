import React from 'react';
import useWatchlist from '../hooks/useWatchlist';

const WatchlistButton = ({ item, size = 'md', showText = true }) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const inWatchlist = isInWatchlist(item.id, item.type);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist(item);
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
        inWatchlist
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
      } ${sizeClasses[size]}`}
      aria-label={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <svg
        className={iconSizeClasses[size]}
        fill={inWatchlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>

      {showText && (
        <span className="ml-2 text-sm font-medium hidden sm:inline">
          {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
        </span>
      )}
    </button>
  );
};

export default WatchlistButton;