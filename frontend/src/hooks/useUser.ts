import { GoogleUser } from "@/types";
import { getLogginedUser } from "@/utils/supabase";
import { useEffect, useState } from "react";

const useUser = (): GoogleUser | undefined => {
  const [user, setUser] = useState<GoogleUser>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getLogginedUser();
    setUser(data.user as GoogleUser);
  };

  return user;
};

export default useUser;
