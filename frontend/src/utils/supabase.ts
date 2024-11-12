// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

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

export const addNotionLink = async (link: string) => {
  const { data: user, error } = await supabase.auth.getUser();
  if (error) return { isSuccess: false, message: error.message };
  const { data: notionData, error: notionError } = await supabase
    .from("notion")
    .insert({
      link: link,
      user_id: user.user?.id,
    });
  if (notionError) return { isSuccess: false, message: notionError.message };
  return { isSuccess: true };
};
