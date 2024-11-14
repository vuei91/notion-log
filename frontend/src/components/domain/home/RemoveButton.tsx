"use client";
import useUser from "@/hooks/useUser";
import { Notion } from "@/types";
import { removeNotion } from "@/utils/supabase";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RemoveButton = ({
  notion,
  refresh,
}: {
  notion: Notion;
  refresh: (path: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const user = useUser();
  useEffect(() => {
    setShow(user?.id === notion.profile.id);
  }, [user, notion]);
  return (
    show && (
      <div
        id="remove-button"
        className="absolute right-3 top-3 cursor-pointer opacity-70 hover:opacity-100"
        onClick={async (e: React.MouseEvent) => {
          e.preventDefault();
          const result = confirm("등록된 링크를 삭제하시겠습니까?");
          if (!result) return;
          const { isSuccess, message } = await removeNotion(notion.id);
          if (isSuccess) {
            refresh("/");
          } else {
            console.error(message);
          }
        }}
      >
        <Image
          width={30}
          height={30}
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/remove.svg`}
          alt={`remove-button`}
        />
      </div>
    )
  );
};

export default RemoveButton;
