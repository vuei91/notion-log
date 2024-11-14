"use client";
import { Notion } from "@/types";
import HomeCard from "./HomeCard";
import useNotions from "@/hooks/useNotions";
import { useEffect, useState } from "react";

const HomeList = () => {
  const [notionList, setNotionList] = useState<Notion[]>([]);
  const { notions, error, loading } = useNotions({ limit: 1, offset: 0 });

  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setPage((prevPage) => prevPage + 1);
      console.log(page);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행, 1은 모든 영역이 교차해야 콜백 함수가 실행.
    });
    // 최하단 요소를 관찰 대상으로 지정함
    const observerTarget = document.getElementById("observer");
    // 관찰 시작
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, []);

  if (error || loading) return;
  return (
    <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notions?.map((notion: Notion) => (
        <HomeCard notion={notion} key={notion.id} />
      ))}
      <div id="observer"></div>
    </div>
  );
};

export default HomeList;
