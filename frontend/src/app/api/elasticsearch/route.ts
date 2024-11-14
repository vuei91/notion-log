import { getNotionDetailForES, notion } from "@/utils/notion";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return Response.json({});
  try {
    const page = await notion.getPage(id);
    const detail = getNotionDetailForES(page);
    return Response.json({ detail });
  } catch (error: Error | any) {
    return Response.json({ error: error.message });
  }
}
