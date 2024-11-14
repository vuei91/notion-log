import axios from "axios";
import { useEffect, useState } from "react";

const useNotionPage = ({ pageUrl }: { pageUrl: string }) => {
  const [notionPage, setNotionPage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | any>();
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/notion-page?id=" + pageUrl);
      setNotionPage(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { notionPage, error, loading };
};

export default useNotionPage;
