"use client";
import pageNumAtom from "@/atom/pageNumAtom";
import tabAtom from "@/atom/tabAtom";
import { Tab } from "@/constants";
import useUser from "@/hooks/useUser";
import { useRecoilState, useSetRecoilState } from "recoil";

const HomeTab = () => {
  const [selectedTab, setSelectedTab] = useRecoilState(tabAtom);
  const setPage = useSetRecoilState(pageNumAtom);
  const user = useUser();
  const handleTabChange = (tab: Tab) => {
    setSelectedTab(tab);
    setPage(1);
  };
  return (
    <div className="my-[10px] flex">
      <div
        className={`box-border flex h-[48px] w-[72px] cursor-pointer flex-col items-center justify-center text-[#0066FF] ${
          selectedTab === Tab.RECOMMAND ? "text-[#0066FF]" : "text-[#767676]"
        }`}
        onClick={() => handleTabChange(Tab.RECOMMAND)}
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
        onClick={() => handleTabChange(Tab.ARTICLE)}
      >
        <div>아티클</div>
        {selectedTab === Tab.ARTICLE && (
          <div className="h-[4px] w-[45px] bg-[#0066FF]"></div>
        )}
      </div>
      {user && (
        <div
          className={`box-border flex h-[48px] w-[72px] cursor-pointer flex-col items-center justify-center ${
            selectedTab === Tab.MY_FEED ? "text-[#0066FF]" : "text-[#767676]"
          }`}
          onClick={() => handleTabChange(Tab.MY_FEED)}
        >
          <div>내 피드</div>
          {selectedTab === Tab.MY_FEED && (
            <div className="h-[4px] w-[50px] bg-[#0066FF]"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeTab;
