"use client";

import useNotions from "@/hooks/useNotions";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import HomeCard from "./HomeCard";
// import { getNotions, getNotionsBySearch } from "@/utils/supabase";
import tabState from "@/atom/tabAtom";
import useUser from "@/hooks/useUser";
import { useSearchParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { useRecoilState } from "recoil";

const HomeList = () => {
  const user = useUser();
  const searchParams = useSearchParams();
  // const [notionList, setNotionList] = useState<Notion[]>([]);
  const [tab, setTab] = useRecoilState(tabState);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView();

  const {
    error,
    loading,
    notions: notionList,
  } = useNotions({ page, userId: user?.id, keyword: searchParams.get("q") });

  const handleFetch = () => {
    const keyword = searchParams.get("q");
  };

  useEffect(() => {
    handleFetch();
  }, [searchParams]);

  useEffect(() => {
    if (inView) {
      handleFetch();
    }
  }, [inView]);

  if (error)
    return (
      <div className="flex h-[70vh] w-[85vw] items-center justify-center text-[20px]">
        {error.message}
      </div>
    );

  if (loading)
    return (
      <div className="flex h-[70vh] w-[85vw] items-center justify-center text-[20px]">
        <ClipLoader />
      </div>
    );

  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {(!notionList || notionList.length === 0) && (
        <div className="flex h-[70vh] w-[85vw] items-center justify-center text-[20px]">
          등록한 노션이 없습니다
        </div>
      )}
      {notionList.map((notion) => (
        <HomeCard notion={notion} key={notion.id} user={user} />
      ))}
      <div className="h-[1px]" ref={ref}></div>
    </div>
  );
};

export default HomeList;
