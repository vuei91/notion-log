"use client";
import { Notion } from "@/types";
import HomeCard from "./HomeCard";
import useNotions from "@/hooks/useNotions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getNotions } from "@/utils/supabase";

const HomeList = () => {
  const [notionList, setNotionList] = useState<Notion[]>([]);
  const [page, setPage] = useState<number>(1);
  const { notions, error, loading } = useNotions({ page });
  const [ref, inView] = useInView();

  useEffect(() => {
    setNotionList(notions);
  }, [notions]);

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, "무한 스크롤 요청 🎃"); // 실행할 함수
      setNotions();
    }
  }, [inView]);

  const setNotions = async () => {
    const { data: notions } = await getNotions(page + 1);
    if (notions && notions.length > 0) setPage(page + 1);
    setNotionList(notionList.concat(notions || []));
    console.log(page);
  };

  if (error || loading) return;

  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notionList?.map((notion: Notion) => (
        <HomeCard notion={notion} key={notion.id} />
      ))}
      <div className="h-[1px]" ref={ref}></div>
    </div>
  );
};

export default HomeList;
