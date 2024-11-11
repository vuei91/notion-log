// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const loginGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) throw error;
  if (data) {
    alert(JSON.stringify(data));
  }
};

// 로그인 된 유저 가져오기
export const getLogginedUser = () => {
  return supabase.auth.getUser();
};
