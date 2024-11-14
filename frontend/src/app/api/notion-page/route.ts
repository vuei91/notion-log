import { notion } from "@/utils/notion";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return Response.json({});
  const data = await notion.getPage(id);
  return Response.json(data);
}
