"use client";
import { Notion } from "@/types";
import HomeCard from "./HomeCard";
import useNotions from "@/hooks/useNotions";

const HomeList = () => {
  const { notions, error, loading } = useNotions();
  if (error || loading) return;
  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notions?.map((notion: Notion) => (
        <HomeCard notion={notion} key={notion.id} />
      ))}
    </div>
  );
};

export default HomeList;
