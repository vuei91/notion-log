import axios from "axios";
import { useEffect, useState } from "react";

const useNotionPage = ({ pageUrl }: { pageUrl: string }) => {
  const [notionPage, setNotionPage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/notion-page?id=" + pageUrl);
      console.log("data", data);
      if (data.error) {
        setErrorMessage(data.error);
        return;
      }
      setNotionPage(data.data);
    } catch (error: Error | any) {
      setErrorMessage(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { notionPage, errorMessage, loading };
};

export default useNotionPage;
