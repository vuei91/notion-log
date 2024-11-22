import { Notion } from "@/types";
import { getNotions } from "@/utils/supabase";
import { useEffect, useState } from "react";

const useNotions = ({ page }: { page: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notions, setNotions] = useState<Notion[]>([]);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = async () => {
    const { data, error } = await getNotions({ page });
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
