import { Notion } from "@/types";
import { supabase } from "@/utils/supabase";
import HomeCard from "./HomeCard";

const HomeList = async ({
  refresh,
}: {
  refresh: (path: string) => Promise<void>;
}) => {
  const { data: notions, error } = await supabase
    .from("notion")
    .select("*, profile(*)");
  if (error) return null;
  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notions?.map((notion: Notion) => (
        <HomeCard notion={notion} key={notion.id} refresh={refresh} />
      ))}
    </div>
  );
};

export default HomeList;
