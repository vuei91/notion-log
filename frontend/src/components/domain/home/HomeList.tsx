"use client";
import { Notion } from "@/types";
import HomeCard from "./HomeCard";
import useNotions from "@/hooks/useNotions";
import { useEffect, useState } from "react";

const HomeList = () => {
  const [notionList, setNotionList] = useState<Notion[]>([]);
  const [offset, setOffset] = useState<Notion[]>([]);
  const { notions, error, loading } = useNotions({ limit: 1, offset: 0 });
  useEffect(() => {}, []);
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
