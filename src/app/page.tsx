import HomeList from "@/components/domain/home/HomeList";
import HomeTab from "@/components/domain/home/HomeTab";
import { Suspense } from "react";

const Home = () => {
  return (
    <Suspense>
      <div className="mx-auto box-border flex max-w-[1480px] flex-col px-[30px]">
        <HomeTab />
        <div className="flex-grow">
          <HomeList />
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
