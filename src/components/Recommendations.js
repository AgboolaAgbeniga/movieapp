import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/Api';

const Recommendations = ({ recommendations, type = 'movie', maxItems = 6 }) => {
  const displayRecommendations = recommendations?.slice(0, maxItems) || [];

  if (!displayRecommendations.length) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">No recommendations available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {type === 'movie' ? 'Recommended Movies' : 'Recommended TV Shows'}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {displayRecommendations.map((item) => (
          <Link
            key={item.id}
            to={`/${type === 'movie' ? 'movies' : 'tv'}/${item.id}`}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={getImageUrl(item.poster_path, 'w300') || '/placeholder.png'}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <h4 className="font-medium text-gray-900 dark:text-white text-xs line-clamp-2 leading-tight">
                  {item.title || item.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {new Date(item.release_date || item.first_air_date).getFullYear()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {recommendations && recommendations.length > maxItems && (
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
            View All Recommendations ({recommendations.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Recommendations;