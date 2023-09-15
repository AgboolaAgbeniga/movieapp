const Award = () => {
  return (
    <div className="absolute top-[0px] left-[0px] w-[785px] h-[55px] text-left text-xl text-white font-poppins">
      <div className="absolute top-[0px] left-[0px] rounded-3xs bg-gray-200 box-border w-[785px] h-[55px] border-[1px] border-solid border-silver" />
      <div className="absolute top-[0px] left-[0px] rounded-3xs bg-crimson-200 w-[253px] h-[55px]" />
      <div className="absolute top-[13px] left-[20px] font-medium">
        Top rated movie #65
      </div>
      <div className="absolute top-[13px] left-[277px] font-medium text-darkslategray-200">
        Awards 9 nominations
      </div>
      <img
        className="absolute top-[13px] left-[729px] w-[30px] h-[30px] object-cover"
        alt=""
        src="/undefined3.png"
      />
    </div>
  );
};

export default Award;
