import { getLogginedUser } from "@/utils/supabase";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getLogginedUser();
    setUser(data.user);
  };

  return user;
};

export default useUser;
