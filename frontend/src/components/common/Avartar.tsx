import Image from "next/image";
import React from "react";

const Avartar = ({ url }: { url?: string }) => {
  return (
    <div className="h-[24px] w-[24px] rounded-full bg-[#716565]">
      {url && (
        <Image
          src={url}
          alt="아바타"
          className="rounded-full"
          width={24}
          height={24}
        />
      )}
    </div>
  );
};

export default Avartar;
