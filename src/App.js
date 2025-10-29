import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";
import HomepageDesktop from "./pages/HomepageDesktop";
import TVShows from "./pages/TVShows";
import TVShowDetails from "./pages/TVShowDetails";
import PersonDetails from "./pages/PersonDetails";
import Movies from "./pages/Movies";
import Upcoming from "./pages/Upcoming";
import GenreMovies from "./pages/GenreMovies";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomepageDesktop />} />
      {/* <Route path="/movies" element={<Movies1 />} /> */}
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/upcoming" element={<Upcoming />} />
      <Route path="/genre/:id" element={<GenreMovies />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/tv" element={<TVShows />} />
      <Route path="/tv/:id" element={<TVShowDetails />} />
      <Route path="/person/:id" element={<PersonDetails />} />
      <Route path="*" element={<NotFound />} />


    </Routes>
  );
}
export default App;
