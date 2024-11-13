import Avartar from "@/components/common/Avartar";
import { Notion } from "@/types";
import moment from "moment";
import Link from "next/link";
import { parsePageId } from "notion-utils";
import React from "react";
import "moment/locale/ko"; // 한국어 로케일 추가

moment.locale("ko");

const HomeCard = ({ notion }: { notion: Notion }) => {
  const profileName = notion.profile.name ?? notion.profile.email.split("@")[0];
  const date = moment(notion.created_at).format("YYYY.MM.DD(ddd)");
  return (
    <Link
      className="flex w-full min-w-[340px] flex-col gap-[10px]"
      href={`/notion/${parsePageId(notion.url)}`}
    >
      <div className="w-full">
        <img
          loading="lazy"
          draggable={false}
          className="max-h-[160px] w-full rounded-[16px] bg-contain"
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
      <div className="flex items-center justify-between">
        <div className="flex gap-[5px]">
          <Avartar
            url={
              notion.profile.avatar_url
                ? notion.profile.avatar_url
                : `${process.env.NEXT_PUBLIC_ASSET_URL}/user_avatar.svg`
            }
          />
          <div>{profileName}</div>
        </div>
        <div className="text-[13px] text-[#A1A9AD]">{date}</div>
      </div>
    </Link>
  );
};

export default HomeCard;
