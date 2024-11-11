import Avartar from "@/components/common/Avartar";
import Link from "next/link";
import React from "react";

const HomeCard = ({ id }: { id: string }) => {
  return (
    <Link
      className="flex w-full min-w-[340px] flex-col gap-[10px]"
      href={`/notion/${id}`}
    >
      <div className="w-full">
        <img
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/background.png`}
          alt="배경이미지"
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <h1 className="truncate text-[20px] font-[800]">
          AI와 UI저작권 Figma와 국내사례에 대해 집중적으로 다뤄보자
        </h1>
        <h6 className="text-overflow text-[16px] text-[#767676]">
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
    </Link>
  );
};

export default HomeCard;
