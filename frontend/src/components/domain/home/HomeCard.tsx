import Avartar from "@/components/common/Avartar";
import React from "react";

const HomeCard = () => {
  return (
    <div className="flex flex-col min-w-[340px] gap-[10px] w-full">
      <div className="w-full">
        <img
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/background.png`}
          alt=""
        />
      </div>
      <div className="gap-[5px] flex-col flex">
        <h1 className="text-[20px] font-[800] truncate">
          AI와 UI저작권 Figma와 국내사례에 대해 집중적으로 다뤄보자
        </h1>
        <h6 className="text-[16px] text-overflow text-[#767676]">
          안녕하세요. 본문입니다. 안녕하세요. 본문입니다.안녕하세요. 본문입니다.
          안녕하세요. 본문입니다.안녕하세요. 본문입니다.
        </h6>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-[5px]">
          <Avartar
            url={`${process.env.NEXT_PUBLIC_ASSET_URL}/user_avatar.svg`}
          />
          <div>username</div>
        </div>
        <div className="text-[13px] text-[#A1A9AD]">2024.11.04(월)</div>
      </div>
    </div>
  );
};

export default HomeCard;
