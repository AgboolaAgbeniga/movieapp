// api.js

const fetchMovieData = async (API_KEY) => {
    const movie_ids = Array.from({ length: 11 }, (_, index) => index + 300);

    const moviePromises = movie_ids.map(async (movie_id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=141ec9bcaff6ece9c873d12a24735d52`);
        const data = await response.json();
        return data;
    });

    // Wait for all movie promises to resolve
    const movies = await Promise.all(moviePromises);
    return movies;
};

export { fetchMovieData };
