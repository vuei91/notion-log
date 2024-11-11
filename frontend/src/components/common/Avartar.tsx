import React from "react";

const Avartar = ({ url }: { url?: string }) => {
  return (
    <div className="w-[24px] h-[24px] rounded-full bg-[#716565]">
      {url && <img src={url} alt="아바타" />}
    </div>
  );
};

export default Avartar;
