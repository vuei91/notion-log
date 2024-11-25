import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";
import { CreateNotion, NotionPaginatedData } from "@/types";
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

export const fetchNotions = async ({
  page,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  keyword,
}: {
  page: number;
  itemsPerPage?: number;
  keyword?: string;
}): Promise<NotionPaginatedData> => {
  try {
    let notionIds: string[] | null = null;

    // Fetch notion IDs from Elasticsearch if a keyword is provided
    if (keyword) {
      const { data: esData } = await axios.get(
        `/api/elasticsearch?keyword=${keyword}&page=${page || 1}`,
      );
      if (!esData.isSuccess) {
        return { error: esData.error };
      }
      notionIds = esData.data;
    }

    // Build the Supabase query
    const query = supabase
      .from("notion")
      .select("*, profile(*), views(*), likes(*)")
      .order("created_at", { ascending: false });

    if (notionIds) {
      query.in("id", notionIds);
    } else {
      query.range((page - 1) * itemsPerPage, page * itemsPerPage - 1);
    }

    const { data, error } = await query;
    if (error) {
      return { error };
    }

    return { data };
  } catch (error: Error | any) {
    return { error: error.message || "An unknown error occurred" };
  }
};

export const getNotions = async ({
  page,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: {
  page: number;
  itemsPerPage?: number;
}): Promise<NotionPaginatedData> => {
  return fetchNotions({ page, itemsPerPage });
};

export const getNotionsBySearch = async ({
  page,
  keyword,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}: {
  page: number;
  keyword?: string;
  itemsPerPage?: number;
}): Promise<NotionPaginatedData> => {
  return fetchNotions({ page, itemsPerPage, keyword });
};

export const getNotionsForRecommand = async () => {
  supabase.from("notion").select("*, profile(*)").order("");
};
export const getNotionsForMe = async () => {};
export const getNotionsForArticle = async () => {};
