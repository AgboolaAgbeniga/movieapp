import React, { useState, useEffect } from 'react';
import { fetchMovieReviews, fetchTVShowReviews, getImageUrl } from '../api/Api';
import LoadingSkeleton from './LoadingSkeleton';

const Reviews = ({ id, type = 'movie', maxItems = 5 }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = type === 'movie'
          ? await fetchMovieReviews(id)
          : await fetchTVShowReviews(id);
        setReviews(data.results || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id, type]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Reviews</h3>
        <LoadingSkeleton type="list" count={3} />
      </div>
    );
  }

  if (error || !reviews.length) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Reviews</h3>
        <p className="text-gray-500 dark:text-gray-400">
          {error || 'No reviews available yet.'}
        </p>
      </div>
    );
  }

  const displayReviews = showAll ? reviews : reviews.slice(0, maxItems);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Reviews ({reviews.length})
        </h3>
        {reviews.length > maxItems && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
          >
            {showAll ? 'Show Less' : `Show All (${reviews.length})`}
          </button>
        )}
      </div>

      <div className="space-y-6">
        {displayReviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={getImageUrl(review.author_details.avatar_path, 'w185') ||
                       `https://ui-avatars.com/api/?name=${review.author}&background=random&color=fff&size=60`}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {review.author}
                    </h4>
                    {review.author_details.rating && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        ⭐ {review.author_details.rating}/10
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(review.created_at)}
                  </span>
                </div>

                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p className="line-clamp-4">
                    {review.content}
                  </p>
                </div>

                {review.content.length > 300 && (
                  <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                    Read more
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;