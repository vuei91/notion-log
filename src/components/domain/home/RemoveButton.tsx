"use client";
import loadingAtom from "@/atom/loadingAtom";
import tabAtom from "@/atom/tabAtom";
import { Tab } from "@/constants";
import { GoogleUser, Notion } from "@/types";
import { removeNotion } from "@/utils/supabase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const RemoveButton = ({
  notion,
  user,
}: {
  notion: Notion;
  user: GoogleUser | undefined;
}) => {
  const [show, setShow] = useState(false);
  const tab = useRecoilValue(tabAtom);
  const setShowLoading = useSetRecoilState(loadingAtom);
  useEffect(() => {
    setShow(user?.id === notion.profile.id && tab === Tab.MY_FEED);
  }, [user, notion]);
  return (
    show && (
      <div
        id="remove-button"
        className="absolute right-3 top-3 cursor-pointer opacity-70 hover:opacity-100"
        onClick={async (e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          const result = confirm("등록된 링크를 삭제하시겠습니까?");
          if (!result) return;
          if (!user?.id) return;
          setShowLoading(true);
          const { isSuccess, message } = await removeNotion({
            id: notion.id,
            userId: user?.id,
          });

          if (isSuccess) {
            window.location.reload();
          } else {
            window.location.reload();
            console.error(message);
          }
        }}
      >
        <Image
          width={20}
          height={20}
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/remove.svg`}
          alt={`remove-button`}
        />
      </div>
    )
  );
};

export default RemoveButton;
