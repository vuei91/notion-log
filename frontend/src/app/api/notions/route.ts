import { supabase } from "@/utils/supabase";

export async function GET() {
  const data = await supabase.from("notion").select("*, profile(*)");
  return Response.json(data);
}
