import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const notionId = req.nextUrl.searchParams.get("notion_id");
    const { error, count } = await supabase
      .from("likes")
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
    const userId = body.userId;
    const notionId = body.notionId;
    const { error } = await supabase
      .from("likes")
      .insert({ user_id: userId, notion_id: notionId });
    if (error) throw error;
    return NextResponse.json({ isSuccess: true });
  } catch (error) {
    return NextResponse.json({ isSuccess: false, error: error });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const notionId = body.notionId;
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", userId)
      .eq("notion_id", notionId);
    if (error) throw error;
    return NextResponse.json({ isSuccess: true });
  } catch (error) {
    return NextResponse.json({ isSuccess: false, error: error });
  }
}
