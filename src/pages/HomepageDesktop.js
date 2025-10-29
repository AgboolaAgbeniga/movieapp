import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import MovieCarousel from "../components/MovieCarousel";
import MovieSection from "../components/MovieSection";
import Footer from "../components/Footer";
import {
  fetchTrendingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  fetchMoviesByGenre,
  fetchPopularTVShows,
  fetchTopRatedTVShows,
  fetchOnTheAirTVShows,
  fetchAiringTodayTVShows
} from "../api/Api";
import useGenres from '../hooks/useGenres';

const HomepageDesktop = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [dramaMovies, setDramaMovies] = useState([]);

  // TV Shows state
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [onTheAirTVShows, setOnTheAirTVShows] = useState([]);
  const [airingTodayTVShows, setAiringTodayTVShows] = useState([]);
  const [actionTVShows, setActionTVShows] = useState([]);
  const [comedyTVShows, setComedyTVShows] = useState([]);
  const [dramaTVShows, setDramaTVShows] = useState([]);

  const [loading, setLoading] = useState(true);

  const { genres: movieGenres } = useGenres('movie');
  const { genres: tvGenres } = useGenres('tv');

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);

        // Fetch all homepage data in parallel - Movies and TV Shows
        const [
          trending,
          popularMovies,
          topRatedMovies,
          nowPlaying,
          upcoming,
          actionMovies,
          comedyMovies,
          dramaMovies,
          popularTV,
          topRatedTV,
          onTheAirTV,
          airingTodayTV,
          actionTV,
          comedyTV,
          dramaTV
        ] = await Promise.all([
          fetchTrendingMovies('week'),
          fetchPopularMovies(),
          fetchTopRatedMovies(),
          fetchNowPlayingMovies(),
          fetchUpcomingMovies(),
          fetchMoviesByGenre(28), // Action genre ID
          fetchMoviesByGenre(35), // Comedy genre ID
          fetchMoviesByGenre(18), // Drama genre ID
          fetchPopularTVShows(),
          fetchTopRatedTVShows(),
          fetchOnTheAirTVShows(),
          fetchAiringTodayTVShows(),
          fetchMoviesByGenre(10759), // Action & Adventure genre ID (using movie function for TV)
          fetchMoviesByGenre(35), // Comedy genre ID (using movie function for TV)
          fetchMoviesByGenre(18)  // Drama genre ID (using movie function for TV)
        ]);

        setTrendingMovies(trending.results?.slice(0, 5) || []);
        setPopularMovies(popularMovies.results || []);
        setTopRatedMovies(topRatedMovies.results || []);
        setNowPlayingMovies(nowPlaying.results || []);
        setUpcomingMovies(upcoming.results || []);
        setActionMovies(actionMovies.results || []);
        setComedyMovies(comedyMovies.results || []);
        setDramaMovies(dramaMovies.results || []);

        setPopularTVShows(popularTV.results || []);
        setTopRatedTVShows(topRatedTV.results || []);
        setOnTheAirTVShows(onTheAirTV.results || []);
        setAiringTodayTVShows(airingTodayTV.results || []);
        setActionTVShows(actionTV.results || []);
        setComedyTVShows(comedyTV.results || []);
        setDramaTVShows(dramaTV.results || []);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  const getGenreName = (genreId, type = 'movie') => {
    const genreList = type === 'movie' ? movieGenres : tvGenres;
    const genre = genreList.find(g => g.id === genreId);
    return genre ? genre.name : '';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      {/* Hero Carousel */}
      <MovieCarousel movies={trendingMovies} />

      {/* Content Sections - Mixed Movies and TV Shows */}
      <div className="bg-gray-900">
        <MovieSection
          title="Popular Movies"
          movies={popularMovies}
          loading={loading}
          seeMoreLink="/movies?sort=popular"
        />

        <MovieSection
          title="Popular TV Shows"
          movies={popularTVShows}
          loading={loading}
          seeMoreLink="/tv?sort=popular"
          type="tv"
        />

        <MovieSection
          title="Top Rated Movies"
          movies={topRatedMovies}
          loading={loading}
          seeMoreLink="/movies?sort=top_rated"
        />

        <MovieSection
          title="Top Rated TV Shows"
          movies={topRatedTVShows}
          loading={loading}
          seeMoreLink="/tv?sort=top_rated"
          type="tv"
        />

        <MovieSection
          title="Now Playing"
          movies={nowPlayingMovies}
          loading={loading}
          seeMoreLink="/movies?sort=now_playing"
        />

        <MovieSection
          title="Currently Airing"
          movies={onTheAirTVShows}
          loading={loading}
          seeMoreLink="/tv?sort=on_the_air"
          type="tv"
        />

        <MovieSection
          title={`${getGenreName(28, 'movie') || 'Action'} Movies`}
          movies={actionMovies}
          loading={loading}
          seeMoreLink={`/movies?genre=28`}
        />

        <MovieSection
          title={`${getGenreName(10759, 'tv') || 'Action & Adventure'} TV Shows`}
          movies={actionTVShows}
          loading={loading}
          seeMoreLink={`/tv?genre=10759`}
          type="tv"
        />

        <MovieSection
          title={`${getGenreName(35, 'movie') || 'Comedy'} Movies`}
          movies={comedyMovies}
          loading={loading}
          seeMoreLink={`/movies?genre=35`}
        />

        <MovieSection
          title={`${getGenreName(35, 'tv') || 'Comedy'} TV Shows`}
          movies={comedyTVShows}
          loading={loading}
          seeMoreLink={`/tv?genre=35`}
          type="tv"
        />

        <MovieSection
          title={`${getGenreName(18, 'movie') || 'Drama'} Movies`}
          movies={dramaMovies}
          loading={loading}
          seeMoreLink={`/movies?genre=18`}
        />

        <MovieSection
          title={`${getGenreName(18, 'tv') || 'Drama'} TV Shows`}
          movies={dramaTVShows}
          loading={loading}
          seeMoreLink={`/tv?genre=18`}
          type="tv"
        />

        <MovieSection
          title="Upcoming Movies"
          movies={upcomingMovies}
          loading={loading}
          seeMoreLink="/movies?sort=upcoming"
        />

        <MovieSection
          title="Airing Today"
          movies={airingTodayTVShows}
          loading={loading}
          seeMoreLink="/tv?sort=airing_today"
          type="tv"
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomepageDesktop;
