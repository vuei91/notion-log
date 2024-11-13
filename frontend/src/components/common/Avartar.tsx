import React from "react";

const Avartar = ({ url }: { url?: string }) => {
  return (
    <div className="h-[24px] w-[24px] rounded-full bg-[#716565]">
      {url && <img src={url} alt="아바타" className="rounded-full" />}
    </div>
  );
};

export default Avartar;
