
import BackDrop from "../components/BackDrop";
import Details from "../components/Details";
import Award from "../components/Award";
import RightBar from "../components/RightBar";
import SideBar from "../components/SideBar";

const Movies1 = () => {
  return (
    <div className="relative bg-white w-full  text-left text-sm text-gainsboro-100 font-poppins">
      <BackDrop />
      <Details />
      <div className="absolute top-[886px] left-[275px] w-[785.06px] text-mini">
        <Award />
             </div>   
        <RightBar />
      <SideBar />
    </div>
  );
};

export default Movies1;
