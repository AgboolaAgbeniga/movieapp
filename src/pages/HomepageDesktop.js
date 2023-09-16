import Header from "../components/Header";
import FeaturedMovie from "../components/FeaturedMovie";
import Footer from "../components/Footer";
import { MovieProvider } from "../api/MovieContext";

const HomepageDesktop = () => {
  return (
    <MovieProvider>
      <div className="relative bg-white h-[2845px] overflow-hidden">
        <Header />
        <FeaturedMovie />
        <Footer />
      </div>

    </MovieProvider>

  );
};

export default HomepageDesktop;
