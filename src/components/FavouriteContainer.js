import { useMemo } from "react";

const FavouriteContainer = ({
  componentTitle,
  imageCaptionId,
  imageCountAndDate,
  propTop,
}) => {
  const groupDiv3Style = useMemo(() => {
    return {
      top: propTop,
    };
  }, [propTop]);

  return (
    <div
      className="absolute top-[1918px] left-[1081px] w-[360px] h-[100px] text-left text-sm text-gainsboro-100 font-poppins"
      style={groupDiv3Style}
    >
      <div className="absolute top-[0px] left-[0px] rounded-3xs shadow-[0px_2px_4px_rgba(0,_0,_0,_0.25)] box-border w-[360px] h-[100px] border-[1px] border-solid border-gainsboro-500" />
      <div className="absolute top-[14px] left-[15px]">{componentTitle}</div>
      <img
        className="absolute top-[8px] left-[275px] rounded-3xs w-[74px] h-[83px] object-cover"
        alt=""
        src={imageCaptionId}
      />
      <div className="absolute top-[71px] left-[15px] text-xs text-gainsboro-600">
        {imageCountAndDate}
      </div>
    </div>
  );
};

export default FavouriteContainer;
