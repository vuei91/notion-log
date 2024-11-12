import React from "react";

const AvartarL = ({ url }: { url?: string }) => {
  return (
    <div className="h-[48px] w-[48px] rounded-full bg-[#716565]">
      {url && <img src={url} alt="아바타" className="rounded-full" />}
    </div>
  );
};

export default AvartarL;
