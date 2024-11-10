import React from "react";

const HomeTab = () => {
  return (
    <div className="flex my-[10px]">
      <div className="flex justify-center items-center flex-col box-border w-[72px] h-[48px] text-[#0066FF]">
        <div>추천</div>
        <div className="w-[32px] h-[4px] bg-[#0066FF]"></div>
      </div>
      <div className="flex justify-center items-center flex-col box-border w-[72px] h-[48px]">
        <div>아티클</div>
        <div className="w-[45px] h-[4px] bg-[#0066FF]"></div>
      </div>
      <div className="flex justify-center items-center flex-col box-border w-[72px] h-[48px]">
        <div>내 피드</div>
        <div className="w-[50px] h-[4px] bg-[#0066FF]"></div>
      </div>
    </div>
  );
};

export default HomeTab;
