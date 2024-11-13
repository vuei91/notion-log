"use client";
import { useState } from "react";

enum Tab {
  RECOMMAND = 0,
  ARTICLE = 1,
  MY_FEED = 2,
}

const HomeTab = () => {
  const [selectedTab, setSelectedTab] = useState<number>(Tab.RECOMMAND);
  const handleTabClick = (tab: number) => {
    setSelectedTab(tab);
  };
  return (
    <div className="my-[10px] flex">
      <div
        className={`box-border flex h-[48px] w-[72px] cursor-pointer flex-col items-center justify-center text-[#0066FF] ${
          selectedTab === Tab.RECOMMAND ? "text-[#0066FF]" : "text-[#767676]"
        }`}
        onClick={() => handleTabClick(Tab.RECOMMAND)}
      >
        <div>추천</div>
        {selectedTab === Tab.RECOMMAND && (
          <div className="h-[4px] w-[32px] bg-[#0066FF]"></div>
        )}
      </div>
      <div
        className={`box-border flex h-[48px] w-[72px] cursor-pointer flex-col items-center justify-center ${
          selectedTab === Tab.ARTICLE ? "text-[#0066FF]" : "text-[#767676]"
        }`}
        onClick={() => handleTabClick(Tab.ARTICLE)}
      >
        <div>아티클</div>
        {selectedTab === Tab.ARTICLE && (
          <div className="h-[4px] w-[45px] bg-[#0066FF]"></div>
        )}
      </div>
      <div
        className={`box-border flex h-[48px] w-[72px] cursor-pointer flex-col items-center justify-center ${
          selectedTab === Tab.MY_FEED ? "text-[#0066FF]" : "text-[#767676]"
        }`}
        onClick={() => handleTabClick(Tab.MY_FEED)}
      >
        <div>내 피드</div>
        {selectedTab === Tab.MY_FEED && (
          <div className="h-[4px] w-[50px] bg-[#0066FF]"></div>
        )}
      </div>
    </div>
  );
};

export default HomeTab;
