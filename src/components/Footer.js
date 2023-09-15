const Footer = () => {
  return (
    <div className="absolute top-[2626px] left-[467px] flex flex-col items-center justify-start gap-[36px] text-left text-lg text-gray-900 font-dm-sans">
      <div className="flex flex-row items-center justify-start gap-[48px]">
        <img
          className="relative w-6 h-[27.43px] overflow-hidden shrink-0"
          alt=""
          src="/fabrandsfacebooksquare.svg"
        />
        <img
          className="relative w-6 h-[27.43px] overflow-hidden shrink-0"
          alt=""
          src="/fabrandsinstagram.svg"
        />
        <img
          className="relative w-6 h-6 overflow-hidden shrink-0"
          alt=""
          src="/fabrandstwitter.svg"
        />
        <img
          className="relative w-6 h-[21.33px] overflow-hidden shrink-0"
          alt=""
          src="/fabrandsyoutube.svg"
        />
      </div>
      <div className="flex flex-row items-start justify-start gap-[48px]">
        <b className="relative">Conditions of Use</b>
        <b className="relative">{`Privacy & Policy`}</b>
        <b className="relative">Press Room</b>
      </div>
      <b className="relative text-gray-500">{`© 2021 MovieBox by Adriana Eka Prayudha  `}</b>
    </div>
  );
};

export default Footer;
