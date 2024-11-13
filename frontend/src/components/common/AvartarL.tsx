import Image from "next/image";
import React from "react";

const AvartarL = ({ url }: { url?: string }) => {
  return (
    <div className="h-[48px] w-[48px] rounded-full bg-[#716565]">
      {url && (
        <Image
          src={url}
          alt="아바타"
          className="rounded-full"
          width={48}
          height={48}
        />
      )}
    </div>
  );
};

export default AvartarL;
