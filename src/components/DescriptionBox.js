const DescriptionBox = () => {
  return (
    <div className="absolute top-[158px] left-[98px] flex flex-col items-start justify-start gap-[16px] text-left text-sm text-white font-dm-sans">
      <b className="relative text-29xl leading-[56px] inline-block w-[404px]">
        John Wick 3 : Parabellum
      </b>
      <div className="relative w-[184px] h-[17px] text-xs">
        <div className="absolute top-[0px] left-[0px] flex flex-row items-center justify-start gap-[10px]">
          <img
            className="relative w-[35px] h-[17px] object-cover"
            alt=""
            src="/mv5bmtk3oda4mjc0nf5bml5bcg5nxkftztgwndc1mzq2ote-1@2x.png"
          />
          <div className="relative leading-[12px]">86.0 / 100</div>
        </div>
        <div className="absolute top-[0px] left-[135px] flex flex-row items-center justify-start gap-[10px]">
          <img
            className="relative w-4 h-[17px] object-cover"
            alt=""
            src="/pngitem-1381056-1@2x.png"
          />
          <div className="relative leading-[12px]">97%</div>
        </div>
      </div>
      <div className="relative leading-[18px] font-medium inline-block w-[302px]">
        John Wick is on the run after killing a member of the international
        assassins' guild, and with a $14 million price tag on his head, he is
        the target of hit men and women everywhere.
      </div>
      <div className="rounded-md bg-rose-700 flex flex-row py-1.5 px-4 items-center justify-start gap-[8px]">
        <img
          className="relative w-5 h-5 overflow-hidden shrink-0"
          alt=""
          src="/play.svg"
        />
        <b className="relative leading-[24px] uppercase">Watch trailer</b>
      </div>
    </div>
  );
};

export default DescriptionBox;
