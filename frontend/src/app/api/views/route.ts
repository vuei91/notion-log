import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const notionId = req.nextUrl.searchParams.get("notion_id");
    const { count, error } = await supabase
      .from("views")
      .select("*", { count: "exact" })
      .eq("notion_id", notionId);
    if (error) throw error;
    return NextResponse.json({ isSuccess: true, count });
  } catch (error) {
    return NextResponse.json({ isSuccess: false, error: error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const notionId = body.notionId;
    const userAgent = req.headers.get("user-agent");
    const ip = req.ip || req.headers.get("x-forwarded-for") || "";
    const { error } = await supabase.from("views").insert({
      notion_id: notionId,
      user_agent: userAgent,
      ip_address: ip,
    });
    if (error) throw error;
    return NextResponse.json({ isSuccess: true });
  } catch (error) {
    return NextResponse.json({ isSuccess: false, error: error });
  }
}
