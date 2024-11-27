"use client";

import tabState from "@/atom/tabAtom";
import useNotions from "@/hooks/useNotions";
import useUser from "@/hooks/useUser";
import { Notion } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
import HomeCard from "./HomeCard";
import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import { removeDuplicatesById } from "@/utils/util";
import { getNotions } from "@/utils/supabase";

const HomeList = () => {
  const user = useUser();
  const searchParams = useSearchParams();
  const [notionList, setNotionList] = useState<Notion[]>([]);
  const [page, setPage] = useState<number>(1);
  const tab = useRecoilValue(tabState);
  const { error, loading, notions, count } = useNotions({
    page,
    tab,
    userId: user?.id,
    keyword: searchParams.get("q"),
  });

  useEffect(() => {
    setNotionList(notions);
  }, [notions]);

  const click = () => {
    if (count <= notionList.length) return;
    setPage((prevPage) => prevPage + 1);
  };

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
    <>
      <div>{page}</div>
      <button onClick={click}>+</button>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(!notionList || notionList.length === 0) && (
          <div className="flex h-[70vh] w-[85vw] items-center justify-center text-[20px]">
            등록한 노션이 없습니다
          </div>
        )}
        {notionList.map((notion) => (
          <HomeCard notion={notion} key={notion.id} user={user} />
        ))}
      </div>
    </>
  );
};

export default HomeList;
