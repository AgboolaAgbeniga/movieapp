const PaginationBox = () => {
  return (
    <div className="absolute top-[245px] left-[1380px] w-9 h-[110px] text-left text-xs text-gray-400 font-dm-sans">
      <div className="absolute top-[0px] left-[26px] flex flex-col items-center justify-start gap-[10px]">
        <b className="relative leading-[14px]">1</b>
        <b className="relative leading-[14px]">2</b>
        <b className="relative text-base leading-[14px] text-white">3</b>
        <b className="relative leading-[14px]">4</b>
        <b className="relative leading-[14px]">5</b>
      </div>
      <div className="absolute top-[53px] left-[0px] rounded-md bg-white w-5 h-[3px]" />
    </div>
  );
};

export default PaginationBox;
