import {
  createIndex,
  initClient,
  insertNotionData,
  searchNotionData,
  updateIndexSettings,
} from "@/utils/elasticsearch";
import { getNotionDetailForES, notion } from "@/utils/notion";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

const client = initClient();

createIndex(client).catch((error) => console.error(error));

export async function GET(req: NextRequest) {
  try {
    const keword = req.nextUrl.searchParams.get("keyword");
    if (!keword) return Response.json({ isSuccess: false });
    const data = await searchNotionData(client, keword);
    return Response.json({ isSuccess: true, data: data?.map((e) => e.id) });
  } catch (error: Error | any) {
    return Response.json({ isSuccess: false, error: error.message });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = body.id;
  if (!id) return Response.json({ isSuccess: false });
  const url = body.url;
  if (!url) return Response.json({ isSuccess: false });
  try {
    const page = await notion.getPage(url);
    const detail = getNotionDetailForES(page);
    detail.id = id;
    await insertNotionData(client, detail);
    return Response.json({ isSuccess: true });
  } catch (error: Error | any) {
    return Response.json({ isSuccess: false, error: error.message });
  }
}

export async function PUT() {
  updateIndexSettings(client);
}
