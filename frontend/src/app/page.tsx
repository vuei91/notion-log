import HomeList from "@/components/domain/home/HomeList";
import HomeTab from "@/components/domain/home/HomeTab";

const Home = () => {
  return (
    <div className="mx-auto box-border flex max-w-[1480px] flex-col px-[30px]">
      <HomeTab />
      <div className="flex-grow">
        <HomeList />
      </div>
    </div>
  );
};

export default Home;
