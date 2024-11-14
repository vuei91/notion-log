import { CreateNotion } from "@/types";
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

export const insertNotion = async (
  data: CreateNotion,
): Promise<{ isSuccess: boolean; message?: string }> => {
  const { error } = await supabase.from("notion").insert(data);
  if (error) return { isSuccess: false, message: error.message };
  return { isSuccess: true };
};

export const removeNotion = async (
  id: number,
): Promise<{ isSuccess: boolean; message?: string }> => {
  const { error } = await supabase.from("notion").delete().eq("id", id);
  if (error) return { isSuccess: false, message: error.message };
  return { isSuccess: true };
};
