"use client";

import tabAtom from "@/atom/tabAtom";
import useNotions from "@/hooks/useNotions";
import useUser from "@/hooks/useUser";
import { Notion } from "@/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import HomeCard from "./HomeCard";
import { getNotions } from "@/utils/supabase";
import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import pageNumAtom from "@/atom/pageNumAtom";

const HomeList = () => {
  const user = useUser();
  const searchParams = useSearchParams();
  const [notionList, setNotionList] = useState<Notion[]>([]);
  const tab = useRecoilValue(tabAtom);
  const [page, setPage] = useRecoilState(pageNumAtom);
  const [innerLoading, setInnerLoading] = useState<boolean>(false);
  const { error, loading, notions, count } = useNotions({
    page,
    tab,
    userId: user?.id,
    keyword: searchParams.get("q"),
  });
  const [ref, inView] = useInView();

  useEffect(() => {
    setNotionList(notions);
  }, [notions]);

  const infinityAction = async () => {
    if (page * DEFAULT_ITEMS_PER_PAGE >= count) return;
    setInnerLoading(true);
    const { notions } = await getNotions({
      page: page + 1,
      tab,
      userId: user?.id,
      keyword: searchParams.get("q"),
    });
    setInnerLoading(false);
    setNotionList((prev) => {
      const existingIds = new Set(prev.map((item) => item.id));
      const newNotions = notions.filter(
        (item: Notion) => !existingIds.has(item.id),
      );
      return [...prev, ...newNotions];
    });
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (inView && !innerLoading) {
      infinityAction();
    }
  }, [inView]);

  if (error)
    return (
      <div className="flex h-[65vh] w-full items-center justify-center text-[20px]">
        {error.message}
      </div>
    );

  if (loading)
    return (
      <div className="flex h-[65vh] w-full items-center justify-center text-[20px]">
        <ClipLoader />
      </div>
    );

  if (!notionList || notionList.length === 0)
    return (
      <div className="flex h-[65vh] w-full items-center justify-center text-[20px]">
        등록한 노션이 없습니다
      </div>
    );

  return (
    <>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {notionList.map((notion) => (
          <HomeCard notion={notion} key={notion.id} user={user} />
        ))}
      </div>
      {innerLoading && (
        <div className="flex h-[10vh] w-[85vw] items-center justify-center">
          <ClipLoader />
        </div>
      )}
      {!loading && <div ref={ref} className="h-[1px]"></div>}
    </>
  );
};

export default HomeList;
