import axios from "axios";
import { useEffect, useState } from "react";

const useNotion = () => {
  const [notion, setNotion] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | any>();
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/notion");
      setNotion(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { notion, error, loading };
};

export default useNotion;
