import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="hidden md:block absolute h-full w-1/5 top-0 left-0 bg-white flex flex-col py-12 px-4 items-center justify-start text-xl text-dimgray font-poppins border-r border-gray-600">
      <div className="relative w-[226px] h-[499px] overflow-hidden shrink-0">
        <div className="absolute h-[10.02%] w-[82.3%] top-[0%] right-[8.85%] bottom-[89.98%] left-[8.85%] flex flex-row items-center justify-start gap-[24px] text-5xl text-darkslategray-200 font-dm-sans">
          <img
            className="relative w-[50px] h-[50px] object-cover"
            alt=""
            src="/undefined.png"
          />
          <b className="relative leading-[24px]">MovieBox</b>
        </div>
        <div className="absolute top-[155px] left-[42px] w-[142px] h-[30px] overflow-hidden">
          <div className="absolute h-full w-[71.13%] top-[0%] right-[28.87%] bottom-[0%] left-[0%]">
            <div className="absolute h-full w-[60.4%] top-[0%] left-[39.6%] font-semibold inline-block">
            <Link to={`/`}> Home</Link>
            </div>
            <img
              className="absolute top-[1px] left-[0px] w-[27px] h-[29px] object-cover"
              alt=""
              src="/undefined31.png"
            />
          </div>
        </div>
        <div className="absolute h-[17.23%] w-full top-[46.49%] right-[0%] bottom-[36.27%] left-[0%] text-crimson-100">
          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] bg-crimson-200" />
          <img
            className="absolute h-[109.34%] w-[4.42%] top-[-2.35%] right-[0%] bottom-[-7%] left-[95.58%] max-w-full overflow-hidden max-h-full object-cover"
            alt=""
            src="/undefined32.png"
          />
          <div className="absolute h-[34.88%] w-[31.86%] top-[32.56%] left-[36.28%] font-semibold inline-block">
            <Link to={`/movies`} className="text-white hover:text-gray-200">Movies</Link>
          </div>
          <img
            className="absolute top-[28px] left-[42px] w-[25px] h-[25px] object-cover"
            alt=""
            src="/undefined33.png"
          />
        </div>
        <div className="absolute top-[364px] left-[42px] w-[142px] h-[30px] overflow-hidden">
          <div className="absolute top-[0px] left-[0px] w-[132px] h-[30px] overflow-hidden">
            <div className="absolute h-full w-[69.7%] top-[0%] left-[30.3%] font-semibold inline-block">
              <Link to={`/tv`} className="text-gray-600 hover:text-gray-800">TV Series</Link>
            </div>
            <img
              className="absolute top-[1px] left-[0px] w-[27px] h-[29px] object-cover"
              alt=""
              src="/undefined34.png"
            />
          </div>
        </div>
        <div className="absolute top-[469px] left-[38px] w-[150px] h-[30px] overflow-hidden">
          <div className="absolute top-[0px] left-[4px] w-[146px] h-[30px] overflow-hidden">
            <div className="absolute h-full w-[72.6%] top-[0%] left-[27.4%] font-semibold inline-block">
              Upcoming
            </div>
            <img
              className="absolute top-[1px] left-[0px] w-[27px] h-[29px] object-cover"
              alt=""
              src="/undefined35.png"
            />
          </div>
        </div>
      </div>
      <div className="relative w-[170px] h-[302px] overflow-hidden shrink-0">
        <div className="absolute top-[272px] left-[14px] w-[142px] h-[30px] overflow-hidden">
          <div className="absolute h-full w-[80.28%] top-[0%] right-[19.72%] bottom-[0%] left-[0%]">
            <div className="absolute h-full w-[64.91%] top-[0%] left-[35.09%] font-semibold inline-block">
              Log out
            </div>
            <img
              className="absolute top-[0px] left-[0px] w-8 h-[30px] object-cover"
              alt=""
              src="/undefined36.png"
            />
          </div>
        </div>
        <div className="absolute top-[0px] left-[0px] w-[170px] h-[228px] text-xs">
          <div className="absolute top-[17.5px] left-[-0.5px] rounded-xl bg-lavenderblush-200 box-border w-[171px] h-[211px] border-[1px] border-solid border-crimson-300" />
          <div className="absolute top-[138px] left-[15px] font-medium">
            <p className="m-0">50k people are playing</p>
            <p className="m-0">now</p>
          </div>
          <div className="absolute top-[60px] left-[16px] text-mini font-semibold text-darkslategray-300">
            <p className="m-0">Play movie quizes</p>
            <p className="m-0">and earn</p>
            <p className="m-0">free tickets</p>
          </div>
          <div className="absolute top-[182px] left-[29px] rounded-11xl bg-crimson-400 w-28 h-[30px]" />
          <div className="absolute top-[188px] left-[46px] font-medium text-crimson-100">
            Start playing
          </div>
          <div className="absolute top-[0px] left-[67px] shadow-[0px_1px_2px_rgba(0,_0,_0,_0.25)] w-[35px] h-[35px]" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
