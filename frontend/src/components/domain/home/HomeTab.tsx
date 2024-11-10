"use client";
import React, { useState } from "react";

enum Tab {
  RECOMMAND = 0,
  ARTICLE = 1,
  MY_FEED = 2,
}

const HomeTab = () => {
  const tabs = [Tab.RECOMMAND, Tab.ARTICLE, Tab.MY_FEED];
  const [selectedTab, setSelectedTab] = useState<number>(Tab.RECOMMAND);
  const handleTabClick = (tab: number) => {
    setSelectedTab(tab);
  };
  return (
    <div className="flex my-[10px]">
      <div
        className={`flex justify-center items-center flex-col box-border w-[72px] h-[48px] cursor-pointer text-[#0066FF] ${
          selectedTab === Tab.RECOMMAND ? "text-[#0066FF]" : "text-[#767676]"
        }`}
        onClick={() => handleTabClick(Tab.RECOMMAND)}
      >
        <div>추천</div>
        {selectedTab === Tab.RECOMMAND && (
          <div className="w-[32px] h-[4px] bg-[#0066FF]"></div>
        )}
      </div>
      <div
        className={`flex justify-center items-center flex-col box-border w-[72px] h-[48px] cursor-pointer ${
          selectedTab === Tab.ARTICLE ? "text-[#0066FF]" : "text-[#767676]"
        }`}
        onClick={() => handleTabClick(Tab.ARTICLE)}
      >
        <div>아티클</div>
        {selectedTab === Tab.ARTICLE && (
          <div className="w-[45px] h-[4px] bg-[#0066FF]"></div>
        )}
      </div>
      <div
        className={`flex justify-center items-center flex-col box-border w-[72px] h-[48px] cursor-pointer ${
          selectedTab === Tab.MY_FEED ? "text-[#0066FF]" : "text-[#767676]"
        }`}
        onClick={() => handleTabClick(Tab.MY_FEED)}
      >
        <div>내 피드</div>
        {selectedTab === Tab.MY_FEED && (
          <div className="w-[50px] h-[4px] bg-[#0066FF]"></div>
        )}
      </div>
    </div>
  );
};

export default HomeTab;
