"use client";
import useUser from "@/hooks/useUser";
import { clickLikes, getCountLikes } from "@/utils/likes";
import Image from "next/image";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const Heart = ({ notionId }: { notionId: number }) => {
  const user = useUser();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [action, setAction] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  useEffect(() => {
    if (!user) return;
    getCountLikes({ notionId, userId: user?.id }).then((data) => {
      if (data.count > 0) setIsLike(true);
      else setIsLike(false);
    });
  }, [user, action]);
  const handleLikeClick = async () => {
    if (!user) {
      alert("로그인 후 이용해주세요");
      return;
    }
    setShowLoading(true);
    await clickLikes({ notionId, userId: user?.id });
    setShowLoading(false);
    setAction(!action);
  };
  return (
    <div
      className="fixed bottom-[30px] right-[50px] z-[201]"
      onClick={!showLoading ? handleLikeClick : undefined}
    >
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-[1px] border-solid border-[#32d2b2] bg-[#fff] p-1 shadow-lg">
        {!showLoading && (
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSET_URL}/heart-${isLike ? "filled" : "empty"}.svg`}
            alt="heart"
            width={30}
            height={30}
          />
        )}
        {showLoading && <ClipLoader color="#32d2b2" size={20} />}
      </div>
    </div>
  );
};

export default Heart;
