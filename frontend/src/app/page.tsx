import HomeList from "@/components/domain/home/HomeList";
import HomeTab from "@/components/domain/home/HomeTab";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col mx-auto max-w-[1480px] box-border px-[30px]">
      <HomeTab />
      <div className="flex-grow">
        <HomeList />
      </div>
    </div>
  );
};

export default Home;
