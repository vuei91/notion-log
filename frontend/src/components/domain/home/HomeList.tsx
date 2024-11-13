import React from "react";
import HomeCard from "./HomeCard";
import { supabase } from "@/utils/supabase";
import { Notion } from "@/types";
import { parsePageId } from "notion-utils";

const HomeList = async () => {
  const { data: notions, error } = await supabase
    .from("notion")
    .select("*, profile(*)");
  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notions?.map((notion: Notion) => (
        <HomeCard key={notion.id} notion={notion} />
      ))}
    </div>
  );
};

export default HomeList;
