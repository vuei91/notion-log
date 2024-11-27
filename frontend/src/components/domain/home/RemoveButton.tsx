"use client";
import { GoogleUser, Notion } from "@/types";
import { removeNotion } from "@/utils/supabase";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RemoveButton = ({
  notion,
  user,
}: {
  notion: Notion;
  user: GoogleUser | undefined;
}) => {
  const [show, setShow] = useState(false);
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
            window.location.reload();
          } else {
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
