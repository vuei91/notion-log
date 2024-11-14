import { supabase } from "@/utils/supabase";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const offset = Number(req.nextUrl.searchParams.get("offset") || 0);
  const limit = Number(req.nextUrl.searchParams.get("limit") || 12) - 1;
  const data = await supabase
    .from("notion")
    .select("*, profile(*)")
    .range(offset, limit);
  return Response.json(data);
}
