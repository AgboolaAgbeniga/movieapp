const RightBar = () => {
  return (
    <div className="absolute top-[516px] left-[1081px] w-[360px] flex flex-col items-center justify-start gap-[33px] text-left text-xl text-gainsboro-100 font-poppins">
      <div className="self-stretch relative h-[184px]">
        <div className="absolute top-[0px] left-[216px] w-36 h-[38px] text-6xl">
          <img
            className="absolute top-[3px] left-[0px] w-[30px] h-[30px] object-cover"
            alt=""
            src="/undefined24.png"
          />
          <div className="absolute top-[0px] left-[39px] font-medium">
            <span>{`8.5 `}</span>
            <span className="text-xl text-dimgray">| 350k</span>
          </div>
        </div>
        <img
          className="absolute top-[2px] left-[51px] w-[35px] h-[35px] object-cover opacity-[0.5]"
          alt=""
          src="/undefined25.png"
        />
        <img
          className="absolute top-[2px] left-[106px] w-[35px] h-[35px] object-cover opacity-[0.5]"
          alt=""
          src="/undefined26.png"
        />
        <img
          className="absolute top-[2px] left-[161px] w-[35px] h-[35px] object-cover opacity-[0.5]"
          alt=""
          src="/undefined27.png"
        />
        <div className="absolute top-[62px] left-[0px] w-[360px] h-[55px] text-white">
          <div className="absolute top-[0px] left-[0px] rounded-3xs bg-crimson-100 w-[360px] h-[55px]" />
          <div className="absolute top-[13px] left-[121px] font-medium [text-shadow:0px_2px_4px_rgba(0,_0,_0,_0.2)]">
            See Showtimes
          </div>
          <img
            className="absolute top-[14px] left-[84px] w-[29px] h-[29px] object-cover"
            alt=""
            src="/undefined28.png"
          />
        </div>
        <div className="absolute top-[129px] left-[0px] w-[360px] h-[55px] text-darkslategray-200">
          <div className="absolute top-[0px] left-[0px] rounded-3xs bg-crimson-200 box-border w-[360px] h-[55px] border-[1px] border-solid border-crimson-100" />
          <img
            className="absolute top-[17px] left-[63px] w-[23px] h-[23px] object-cover"
            alt=""
            src="/undefined29.png"
          />
          <div className="absolute top-[13px] left-[98px] font-medium">
            More watch options
          </div>
        </div>
      </div>
      <div className="self-stretch relative h-[229px] text-sm">
        <img
          className="absolute top-[0px] left-[0px] rounded-3xs w-[360px] h-[229px] object-cover"
          alt=""
          src="/undefined30.png"
        />
        <div className="absolute top-[187px] left-[0px] rounded-3xs bg-gray-500 [backdrop-filter:blur(4px)] w-[360px] h-[42px]" />
        <img
          className="absolute top-[197px] left-[14px] w-[27px] h-[27px] object-cover"
          alt=""
          src="/undefined18.png"
        />
        <div className="absolute top-[199px] left-[51px] font-medium [text-shadow:0px_1px_2px_rgba(0,_0,_0,_0.25)]">
          The Best Movies and Shows in September
        </div>
      </div>
    </div>
  );
};

export default RightBar;
