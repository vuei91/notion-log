import tabState from "@/atom/tabAtom";
import { Notion } from "@/types";
import { getNotions } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useUser from "./useUser";

const useNotions = ({ page, userId }: { page: number; userId?: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notions, setNotions] = useState<Notion[]>([]);
  const [error, setError] = useState<Error>();
  const tab = useRecoilValue(tabState);
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [tab, userId]);
  const fetchData = async () => {
    const { data, error } = await getNotions({ page, tab, userId });
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
