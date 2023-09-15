import Navbar from "./Navbar";
import DescriptionBox from "./DescriptionBox";
import PaginationBox from "./PaginationBox";

const Header = () => {
  return (
    <div className="absolute top-[0px] left-[0px] w-[1440px] h-[600px] text-left text-base text-white font-dm-sans">
      <img
        className="absolute top-[0px] left-[0px] w-[1440px] h-[600px] object-cover"
        alt=""
        src="/poster@2x.png"
      />
      <Navbar />
      <DescriptionBox />
      <PaginationBox />
    </div>
  );
};

export default Header;
