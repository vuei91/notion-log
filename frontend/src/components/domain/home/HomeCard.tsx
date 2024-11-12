import Avartar from "@/components/common/Avartar";
import { Notion } from "@/types";
import Link from "next/link";
import { parsePageId } from "notion-utils";
import React from "react";

const HomeCard = ({ notion }: { notion: Notion }) => {
  return (
    <Link
      className="flex w-full min-w-[340px] flex-col gap-[10px]"
      href={`/notion/${parsePageId(notion.url)}`}
    >
      <div className="w-full">
        <img
          src={
            notion.thumbnail
              ? notion.thumbnail
              : `${process.env.NEXT_PUBLIC_ASSET_URL}/background.png`
          }
          alt="배경이미지"
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <h1 className="truncate text-[20px] font-[800]">{notion.title}</h1>
        <h6 className="text-overflow text-[16px] text-[#767676]">
          {notion.description}
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
