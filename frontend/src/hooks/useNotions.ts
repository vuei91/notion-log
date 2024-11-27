import tabState from "@/atom/tabAtom";
import { Tab } from "@/constants";
import { Notion } from "@/types";
import { getNotions } from "@/utils/supabase";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useNotions = ({
  page,
  tab,
  userId,
  keyword,
}: {
  page: number;
  tab: Tab;
  userId?: string;
  keyword: string | null;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notions, setNotions] = useState<Notion[]>([]);
  const [count, setCount] = useState<number>(0);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [page, tab, userId, keyword]);
  const fetchData = async () => {
    const { isSuccess, notions, error, count } = await getNotions({
      page,
      tab,
      userId,
      keyword,
    });
    setLoading(false);
    if (!isSuccess) return;
    if (error) {
      setError(error);
      return;
    }
    setCount(count || 0);
    setNotions(notions || []);
  };
  return { notions, error, loading, count };
};

export default useNotions;
