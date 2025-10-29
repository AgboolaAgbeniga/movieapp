import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../api/Api';
import WatchlistButton from './WatchlistButton';
import LoadingSkeleton from './LoadingSkeleton';

const MovieSection = ({
  title,
  movies,
  loading = false,
  seeMoreLink = '#',
  showSeeMore = true,
  type = 'movie'
}) => {
  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{title}</h2>
          <LoadingSkeleton type="card" count={6} />
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {showSeeMore && (
            <Link
              to={seeMoreLink}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors"
            >
              <span>See More</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.slice(0, 12).map((item) => {
            const isTV = type === 'tv';
            const title = isTV ? item.name : item.title;
            const releaseDate = isTV ? item.first_air_date : item.release_date;
            const linkPath = isTV ? `/tv/${item.id}` : `/movies/${item.id}`;

            return (
              <div key={item.id} className="group relative">
                <Link to={linkPath} className="block">
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 relative">
                    <img
                      src={getImageUrl(item.poster_path, 'w500') || '/placeholder.png'}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />

                    {/* Overlay with rating */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
                      ⭐ {item.vote_average?.toFixed(1)}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-red-600 text-white p-3 rounded-full">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="mt-3">
                    <h3 className="font-semibold text-white line-clamp-2 text-sm leading-tight mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {releaseDate ? new Date(releaseDate).getFullYear() : 'TBA'}
                    </p>
                  </div>
                </Link>

                {/* Watchlist Button */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <WatchlistButton
                    item={{
                      id: item.id,
                      type: type,
                      title: title,
                      poster_path: item.poster_path,
                      release_date: releaseDate,
                      vote_average: item.vote_average
                    }}
                    size="sm"
                    showText={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MovieSection;