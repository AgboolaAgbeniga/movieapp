import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieKeywords,
  fetchMovieRecommendations,
  getImageUrl
} from '../api/Api';
import CastList from './CastList';
import KeywordTags from './KeywordTags';
import Recommendations from './Recommendations';
import Reviews from './Reviews';
import LoadingSkeleton from './LoadingSkeleton';
import useGenres from '../hooks/useGenres';

const Details = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { getGenreNames } = useGenres('movie');

  useEffect(() => {
    const fetchAllMovieData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [details, credits, keywordsData, recommendationsData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieCredits(id),
          fetchMovieKeywords(id),
          fetchMovieRecommendations(id)
        ]);

        setMovieDetails(details);
        setCast(credits.cast || []);
        setKeywords(keywordsData.keywords || []);
        setRecommendations(recommendationsData.results || []);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllMovieData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="absolute top-[518px] left-[275px] w-[785.06px]">
        <LoadingSkeleton type="detail" />
      </div>
    );
  }

  if (error || !movieDetails) {
    return (
      <div className="absolute top-[518px] left-[275px] w-[785.06px] text-center py-8">
        <p className="text-red-500">{error || 'Movie not found'}</p>
      </div>
    );
  }

  const genreNames = getGenreNames(movieDetails.genres?.map(g => g.id));

  return (
    <div className="absolute top-[518px] left-[275px] w-[785.06px] space-y-8 text-left text-mini text-firebrick font-poppins">
      {/* Movie Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <div className="space-y-4">
          <div className="text-4xl text-darkslategray-100">
            <span data-testid="movie-title" className="text-2xl font-bold text-gray-900 dark:text-white">
              {movieDetails.title}
            </span>
            <span className="text-lg text-gray-600 dark:text-gray-400 ml-2">
              ({new Date(movieDetails.release_date).getFullYear()})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span data-testid="movie-release-date">
              📅 {new Date(movieDetails.release_date).toLocaleDateString()}
            </span>
            <span>⏱️ {movieDetails.runtime} min</span>
            <span>⭐ {movieDetails.vote_average?.toFixed(1)}/10</span>
            <span>🗳️ {movieDetails.vote_count?.toLocaleString()} votes</span>
          </div>

          {genreNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genreNames.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <div className="text-lg text-darkslategray-200 leading-relaxed">
            <p className="m-0" data-testid="movie-overview">{movieDetails.overview}</p>
          </div>

          <KeywordTags keywords={keywords} />
        </div>
      </div>

      {/* Cast */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <CastList cast={cast} maxItems={10} />
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <Recommendations recommendations={recommendations} type="movie" maxItems={6} />
      </div>

      {/* Reviews */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
        <Reviews id={id} type="movie" maxItems={3} />
      </div>
    </div>
  );
};

export default Details;
