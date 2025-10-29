// api.js

const API_KEY = process.env.REACT_APP_TMDB_API_KEY || '141ec9bcaff6ece9c873d12a24735d52';
const BASE_URL = 'https://api.themoviedb.org/3';

// API Configuration
let imageConfig = null;

export const getImageConfig = async () => {
  if (imageConfig) return imageConfig;

  try {
    const response = await fetch(`${BASE_URL}/configuration?api_key=${API_KEY}`);
    const data = await response.json();
    imageConfig = data.images;
    return imageConfig;
  } catch (error) {
    console.error('Error fetching image config:', error);
    return null;
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder.png';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Generic API fetch function
const apiFetch = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);

    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);
    throw error;
  }
};

// Movie APIs
export const fetchTopRatedMovies = (page = 1) => apiFetch('/movie/top_rated', { page });
export const fetchPopularMovies = (page = 1) => apiFetch('/movie/popular', { page });
export const fetchNowPlayingMovies = (page = 1) => apiFetch('/movie/now_playing', { page });
export const fetchUpcomingMovies = (page = 1) => apiFetch('/movie/upcoming', { page });
export const fetchTrendingMovies = (timeWindow = 'week') => apiFetch(`/trending/movie/${timeWindow}`);
export const fetchMoviesByGenre = (genreId, page = 1) => apiFetch('/discover/movie', { with_genres: genreId, page });

export const searchMovies = (query, page = 1) => apiFetch('/search/movie', { query, page });
export const discoverMovies = (params = {}) => apiFetch('/discover/movie', params);

export const fetchMovieDetails = (id) => apiFetch(`/movie/${id}`);
export const fetchMovieVideos = (id) => apiFetch(`/movie/${id}/videos`);
export const fetchMovieCredits = (id) => apiFetch(`/movie/${id}/credits`);
export const fetchMovieImages = (id) => apiFetch(`/movie/${id}/images`);
export const fetchSimilarMovies = (id, page = 1) => apiFetch(`/movie/${id}/similar`, { page });
export const fetchMovieRecommendations = (id, page = 1) => apiFetch(`/movie/${id}/recommendations`, { page });
export const fetchMovieKeywords = (id) => apiFetch(`/movie/${id}/keywords`);
export const fetchMovieReviews = (id, page = 1) => apiFetch(`/movie/${id}/reviews`, { page });

// TV Series APIs
export const fetchPopularTVShows = (page = 1) => apiFetch('/tv/popular', { page });
export const fetchTopRatedTVShows = (page = 1) => apiFetch('/tv/top_rated', { page });
export const fetchOnTheAirTVShows = (page = 1) => apiFetch('/tv/on_the_air', { page });
export const fetchAiringTodayTVShows = (page = 1) => apiFetch('/tv/airing_today', { page });

export const searchTVShows = (query, page = 1) => apiFetch('/search/tv', { query, page });
export const discoverTVShows = (params = {}) => apiFetch('/discover/tv', params);

export const fetchTVShowDetails = (id) => apiFetch(`/tv/${id}`);
export const fetchTVShowVideos = (id) => apiFetch(`/tv/${id}/videos`);
export const fetchTVShowCredits = (id) => apiFetch(`/tv/${id}/credits`);
export const fetchTVShowImages = (id) => apiFetch(`/tv/${id}/images`);
export const fetchSimilarTVShows = (id, page = 1) => apiFetch(`/tv/${id}/similar`, { page });
export const fetchTVShowRecommendations = (id, page = 1) => apiFetch(`/tv/${id}/recommendations`, { page });
export const fetchTVShowKeywords = (id) => apiFetch(`/tv/${id}/keywords`);
export const fetchTVShowReviews = (id, page = 1) => apiFetch(`/tv/${id}/reviews`, { page });

// Person APIs
export const fetchPersonDetails = (id) => apiFetch(`/person/${id}`);
export const fetchPersonImages = (id) => apiFetch(`/person/${id}/images`);
export const fetchPersonMovieCredits = (id) => apiFetch(`/person/${id}/movie_credits`);
export const fetchPersonTVCredits = (id) => apiFetch(`/person/${id}/tv_credits`);

// Genre APIs
export const fetchMovieGenres = () => apiFetch('/genre/movie/list');
export const fetchTVGenres = () => apiFetch('/genre/tv/list');

// Legacy function for backward compatibility
export const fetchMovieData = async () => {
  try {
    const data = await fetchTopRatedMovies();
    return data.results.slice(0, 10);
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
};

export { API_KEY, BASE_URL };
