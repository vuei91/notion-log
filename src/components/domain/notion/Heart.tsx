"use client";
import useUser from "@/hooks/useUser";
import { clickLikes, getCountLikes } from "@/utils/likes";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Heart = ({ notionId }: { notionId: number }) => {
  const user = useUser();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [action, setAction] = useState<boolean>(false);
  useEffect(() => {
    if (!user) return;
    getCountLikes({ notionId, userId: user?.id }).then((data) => {
      if (data.count > 0) setIsLike(true);
      else setIsLike(false);
    });
  }, [user, action]);
  return (
    <div
      className="fixed bottom-[30px] right-[50px] z-[201]"
      onClick={async (e) => {
        e.preventDefault();
        if (!user) return;
        await clickLikes({ notionId, userId: user?.id });
        setAction(!action);
      }}
    >
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-[1px] border-solid border-[#32d2b2] bg-[#fff] p-1 shadow-lg">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSET_URL}/heart-${isLike ? "filled" : "empty"}.svg`}
          alt="heart"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

export default Heart;
