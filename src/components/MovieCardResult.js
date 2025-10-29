// MovieCardResult.js
import React from 'react';

const MovieCardResult = ({ title, posterPath, releaseDate }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        try {
            return new Date(dateString).getFullYear().toString();
        } catch {
            return 'TBA';
        }
    };

    return (
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow" aria-label={title}>
            <div className="aspect-[2/3] overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    alt={title}
                    src={posterPath || '/placeholder.png'}
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <div className="p-3">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                    {title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    {formatDate(releaseDate)}
                </p>
            </div>
        </article>
    );
};

export default MovieCardResult;
