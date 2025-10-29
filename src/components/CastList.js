import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/Api';

const CastList = ({ cast, maxItems = 10 }) => {
  const displayCast = cast?.slice(0, maxItems) || [];

  if (!displayCast.length) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 dark:text-gray-400">No cast information available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Cast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {displayCast.map((person) => (
          <Link
            key={person.id}
            to={`/person/${person.id}`}
            className="group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={getImageUrl(person.profile_path, 'w300') || '/placeholder-person.png'}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {person.name}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {person.character}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {cast && cast.length > maxItems && (
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
            View All Cast ({cast.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default CastList;