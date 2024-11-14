import axios from "axios";
import { useEffect, useState } from "react";

const useNotion = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [notion, setNotion] = useState();
  const [error, setError] = useState();
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
    setNotion(data.data);
  };
  return { notion, error, loading };
};

export default useNotion;
