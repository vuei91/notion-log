import { DEFAULT_ITEMS_PER_PAGE, Tab } from "@/constants";
import { CreateNotion } from "@/types";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const loginGoogle = async (): Promise<{
  isSuccess: boolean;
  message?: string;
}> => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) return { isSuccess: false, message: error.message };
  if (data) return { isSuccess: true };
  return { isSuccess: false };
};

export const logoutGoogle = async (): Promise<{
  isSuccess: boolean;
  message?: string;
}> => {
  const { error } = await supabase.auth.signOut();
  if (error) return { isSuccess: false, message: error.message };
  return { isSuccess: true };
};

// 로그인 된 유저 가져오기
export const getLogginedUser = () => {
  return supabase.auth.getUser();
};

export const insertNotion = async (
  data: CreateNotion,
): Promise<{ isSuccess: boolean; message?: string; id?: number }> => {
  const { data: notion, error } = await supabase
    .from("notion")
    .insert(data)
    .select("id")
    .single();
  if (error) return { isSuccess: false, message: error.message };
  return { isSuccess: true, id: notion?.id };
};

export const removeNotion = async (
  id: number,
): Promise<{ isSuccess: boolean; message?: string }> => {
  const { error } = await supabase.from("notion").delete().eq("id", id);
  if (error) return { isSuccess: false, message: error.message };
  return { isSuccess: true };
};

export const getNotions = async ({
  page = 1,
  tab,
  userId,
  keyword,
}: {
  page: number;
  tab: Tab;
  userId?: string;
  keyword: string | null;
}) => {
  if (keyword) {
    const { data } = await axios.get(
      `/api/notion-data?type=search&page=${page}&keyword=${keyword}`,
    );
    return data;
  }
  switch (tab) {
    case Tab.RECOMMAND: {
      const { data } = await axios.get(
        `/api/notion-data?type=recommend&page=${page}`,
      );
      return data;
    }
    case Tab.ARTICLE: {
      const { data } = await axios.get(
        `/api/notion-data?type=article&page=${page}`,
      );
      return data;
    }
    case Tab.MY_FEED: {
      const { data } = await axios.get(
        `/api/notion-data?type=me&userId=${userId}&page=${page}`,
      );
      return data;
    }
  }
};

export const getAllNotions = async ({ page }: { page: number }) => {
  return supabase
    .from("notion")
    .select("*, profile(*), views(*), likes(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(
      (page - 1) * DEFAULT_ITEMS_PER_PAGE,
      page * DEFAULT_ITEMS_PER_PAGE - 1,
    );
};

export const getNotionsForRecommend = async ({ page }: { page: number }) => {
  return await supabase
    .rpc(`get_recommended_notion`, {}, { count: "exact" })
    .range(
      (page - 1) * DEFAULT_ITEMS_PER_PAGE,
      page * DEFAULT_ITEMS_PER_PAGE - 1,
    );
};
export const getNotionsForMe = async ({
  page,
  userId,
}: {
  page: number;
  userId?: string;
}) => {
  if (!userId)
    return { data: [], error: new Error("user가 존재하지 않습니다"), count: 0 };
  return await supabase
    .from("notion")
    .select("*, profile(*), views(*), likes(*)", { count: "exact" })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(
      (page - 1) * DEFAULT_ITEMS_PER_PAGE,
      page * DEFAULT_ITEMS_PER_PAGE - 1,
    );
};
export const getNotionsForArticle = async ({ page }: { page: number }) => {
  return await supabase
    .from("notion")
    .select("*, profile(*), views(*), likes(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(
      (page - 1) * DEFAULT_ITEMS_PER_PAGE,
      page * DEFAULT_ITEMS_PER_PAGE - 1,
    );
};

export const getNotionsForSearch = async ({
  page,
  keyword,
}: {
  page: number;
  keyword: string;
}) => {
  const { data: esData } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/elasticsearch?keyword=${keyword}&page=${page}`,
  );

  if (!esData.isSuccess) {
    return { data: [], error: esData.error, count: 0 };
  }

  const notionIds = esData.data;

  return supabase
    .from("notion")
    .select("*, profile(*), views(*), likes(*)", { count: "exact" })
    .in("id", notionIds)
    .order("created_at", { ascending: false })
    .range(
      (page - 1) * DEFAULT_ITEMS_PER_PAGE,
      page * DEFAULT_ITEMS_PER_PAGE - 1,
    );
};
