"use client";

import { Notion } from "@/types";
import HomeCard from "./HomeCard";
import useNotions from "@/hooks/useNotions";
import { use, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getNotions, getNotionsBySearch } from "@/utils/supabase";
import { useSearchParams } from "next/navigation";
import { removeDuplicatesById } from "@/utils/util";
import useUser from "@/hooks/useUser";

const HomeList = () => {
  const user = useUser();
  const searchParams = useSearchParams();
  const [notionList, setNotionList] = useState<Notion[]>([]);
  const [page, setPage] = useState<number>(0);
  const [ref, inView] = useInView();
  const { error, loading } = useNotions({ page });

  const fetchNotions = async (page: any, keyword?: string) => {
    const fetchFn = keyword ? getNotionsBySearch : getNotions;
    const { data: newNotions } = await fetchFn({ page, keyword });

    if (newNotions?.length) {
      setNotionList(
        (prevList) =>
          removeDuplicatesById([...prevList, ...newNotions]) as Notion[],
      );
      setPage(page);
    }
  };

  const handleFetch = () => {
    const keyword = searchParams.get("q");
    fetchNotions(page + 1, keyword || undefined);
  };

  useEffect(() => {
    handleFetch();
  }, [searchParams]);

  useEffect(() => {
    if (inView) {
      handleFetch();
    }
  }, [inView]);

  if (error || loading) return null;

  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notionList.map((notion) => (
        <HomeCard notion={notion} key={notion.id} user={user} />
      ))}
      <div className="h-[1px]" ref={ref}></div>
    </div>
  );
};

export default HomeList;
