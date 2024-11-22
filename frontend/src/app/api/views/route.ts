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
    const uesrAgent = body.userAgent;
    const ipAddress = body.ipAddress;
    const { error } = await supabase.from("views").insert({
      notion_id: notionId,
      user_agent: uesrAgent,
      ip_address: ipAddress,
    });
    if (error) throw error;
    return NextResponse.json({ isSuccess: true });
  } catch (error) {
    return NextResponse.json({ isSuccess: false, error: error });
  }
}
