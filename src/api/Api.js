// api.js

const fetchMovieData = async (API_KEY) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=141ec9bcaff6ece9c873d12a24735d52`
      );
  
      if (!response.ok) {
        throw new Error('Failed to fetch top-rated movies.');
      }
  
      const data = await response.json();
      const movies = data.results.slice(0, 10); // Get the first ten movies
      return movies;
    } catch (error) {
      // Handle errors here, e.g., log the error or return an empty array
      console.error('Error fetching top-rated movies:', error);
      return [];
    }
  };
  
  export { fetchMovieData };
  


