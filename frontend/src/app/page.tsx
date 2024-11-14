import HomeList from "@/components/domain/home/HomeList";
import HomeTab from "@/components/domain/home/HomeTab";
import { revalidatePath } from "next/cache";

const Home = async () => {
  const refresh = async (path: string) => {
    "use server";
    revalidatePath(path);
  };

  return (
    <div className="mx-auto box-border flex max-w-[1480px] flex-col px-[30px]">
      <HomeTab />
      <div className="flex-grow">
        <HomeList refresh={refresh} />
      </div>
    </div>
  );
};

export default Home;
