import tabState from "@/atom/tabAtom";
import { Notion } from "@/types";
import { getNotions } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const useNotions = ({
  page,
  userId,
  keyword,
}: {
  page: number;
  userId?: string;
  keyword: string | null;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notions, setNotions] = useState<Notion[]>([]);
  const [error, setError] = useState<Error>();
  const tab = useRecoilValue(tabState);
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [tab, userId, keyword]);
  const fetchData = async () => {
    const { data, error } = await getNotions({ page, tab, userId, keyword });
    setLoading(false);
    if (error) {
      setError(error);
      return;
    }
    setNotions(data || []);
  };
  return { notions, error, loading };
};

export default useNotions;
