import { useState, useEffect } from 'react';
import { fetchMovieGenres, fetchTVGenres } from '../api/Api';

const useGenres = (type = 'movie') => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const data = type === 'movie' ? await fetchMovieGenres() : await fetchTVGenres();
        setGenres(data.genres || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching genres:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [type]);

  const getGenreNames = (genreIds) => {
    if (!genreIds || !Array.isArray(genreIds)) return [];
    return genreIds.map(id => {
      const genre = genres.find(g => g.id === id);
      return genre ? genre.name : '';
    }).filter(name => name);
  };

  const getGenreName = (genreId) => {
    const genre = genres.find(g => g.id === genreId);
    return genre ? genre.name : '';
  };

  return {
    genres,
    loading,
    error,
    getGenreNames,
    getGenreName
  };
};

export default useGenres;