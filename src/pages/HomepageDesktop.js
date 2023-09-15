import Header from "../components/Header";
import FeaturedMovie from "../components/FeaturedMovie";
import NewArrival from "../components/NewArrival";
import ContainerNewArrivalDune1 from "../components/ContainerNewArrivalDune1";
import Footer from "../components/Footer";
import { MovieProvider } from "../api/MovieContext";

const HomepageDesktop = () => {
  return (
    <MovieProvider>
      <div className="relative bg-white h-[2845px] overflow-hidden">
        <Header />
        <FeaturedMovie />
        {/* <NewArrival /> */}
        {/* <ContainerNewArrivalDune1 /> */}
        <Footer />
      </div>

    </MovieProvider>

  );
};

export default HomepageDesktop;
