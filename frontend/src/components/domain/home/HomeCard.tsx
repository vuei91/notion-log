"use client";
import Avartar from "@/components/common/Avartar";
import useNotionPage from "@/hooks/useNotionPage";
import { GoogleUser, Notion } from "@/types";
import { getNotionDetail } from "@/utils/notion";
import moment from "moment";
import "moment/locale/ko"; // 한국어 로케일 추가
import Image from "next/image";
import { parsePageId } from "notion-utils";
import RemoveButton from "./RemoveButton";
import { increamentViews } from "@/utils/views";
import { useRouter } from "next/navigation";
import { clickLikes, increamentLikes } from "@/utils/likes";

moment.locale("ko");

const HomeCard = ({
  notion,
  user,
}: {
  notion: Notion;
  user: GoogleUser | undefined;
}) => {
  const router = useRouter();
  const { loading, errorMessage, notionPage } = useNotionPage({
    pageUrl: notion.url,
  });
  if (loading || errorMessage) {
    if (errorMessage?.includes("Notion page not found")) {
      return (
        <div className="relative flex h-[282px] w-full min-w-[340px] flex-col items-center justify-center gap-[10px] rounded-[16px] border-[1px] bg-[#efefef]">
          <RemoveButton notion={notion} user={user} />
          페이지 게시를 종료하였습니다!
        </div>
      );
    }
    return;
  }
  const profileName = notion.profile.name ?? notion.profile.email.split("@")[0];
  const date = moment(notion.created_at).format("YYYY.MM.DD(ddd)");
  const notionData = getNotionDetail(notionPage);
  return (
    <div
      className="relative flex max-h-[300px] min-w-[340px] flex-col gap-[10px]"
      onClick={async () => {
        try {
          await increamentViews({ notionId: notion.id });
          router.push(`/notion/${parsePageId(notion.url)}`);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <RemoveButton notion={notion} user={user} />
      <div className="flex justify-center rounded-[16px] border-[1px] bg-[#efefef]">
        <Image
          loading="lazy"
          draggable={false}
          className="h-[160px] bg-contain"
          width={300}
          height={300}
          src={
            notionData?.thumbnail
              ? notionData.thumbnail
              : `${process.env.NEXT_PUBLIC_ASSET_URL}/background.png`
          }
          alt="배경이미지"
        />
      </div>
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between">
          <h1 className="truncate text-[20px] font-[800]">
            {notionData?.title}
          </h1>
          <div
            className="flex items-center justify-center gap-[5px]"
            onClick={async (e) => {
              e.preventDefault();
              if (!user) return;
              await clickLikes({ notionId: notion.id, userId: user?.id });
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${notion.likes.some((v) => v.user_id === user?.id) ? "full" : "empty"}-heart.svg`}
              alt="heart"
              width={18}
              height={18}
            />
            <div className="text-[13px] text-[#888]">{notion.likes.length}</div>
          </div>
        </div>
        <h6 className="text-overflow text-[16px] text-[#767676]">
          {notionData?.description}
        </h6>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <Avartar
            url={
              notion.profile.avatar_url
                ? notion.profile.avatar_url
                : `${process.env.NEXT_PUBLIC_ASSET_URL}/user_avatar.svg`
            }
          />
          <div>{profileName}</div>
          <div className="text-[13px] text-[#A1A9AD]">{date}</div>
        </div>
        <div className="flex items-center text-[13px] text-[#888]">
          조회수 {notion.views.length}회
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
