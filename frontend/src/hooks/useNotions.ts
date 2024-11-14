import { Notion } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useNotions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notions, setNotions] = useState<Notion[]>([]);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = async () => {
    const { data } = await axios.get("/api/notions");
    setLoading(false);
    if (data.error) {
      setError(error);
      return;
    }
    setNotions(data.data);
  };
  return { notions, error, loading };
};

export default useNotions;
