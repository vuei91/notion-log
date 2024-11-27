import { notion } from "@/utils/notion";
import {
  getNotionsForArticle,
  getNotionsForMe,
  getNotionsForRecommend,
  getNotionsForSearch,
} from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
import { ExtendedRecordMap } from "notion-types";

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get("type");
    const page = req.nextUrl.searchParams.get("page");
    if (!type) return Response.json({ isSuccess: false });
    switch (type) {
      case "article": {
        const { data, error, count } = await getNotionsForArticle({
          page: Number(page),
        });
        if (error) throw error;
        for (const n of data || []) {
          try {
            const page: ExtendedRecordMap = await notion.getPage(n.url);
            n.page = page;
          } catch (error: Error | any) {
            if (error?.message?.includes("Notion page not found")) {
              n.page = { isNotFound: true };
            } else {
              n.page = null;
            }
          }
        }
        return NextResponse.json({ isSuccess: true, notions: data, count });
      }
      case "recommend": {
        const { data, error, count } = await getNotionsForRecommend({
          page: Number(page),
        });
        if (error) throw error;
        for (const n of data || []) {
          try {
            const page: ExtendedRecordMap = await notion.getPage(n.url);
            n.page = page;
          } catch (error: Error | any) {
            if (error?.message?.includes("Notion page not found")) {
              n.page = { isNotFound: true };
            } else {
              n.page = null;
            }
          }
        }
        return NextResponse.json({ isSuccess: true, notions: data, count });
      }
      case "me": {
        const userId = req.nextUrl.searchParams.get("userId");
        const { data, count, error } = await getNotionsForMe({
          page: Number(page),
          userId: userId || undefined,
        });
        if (error) throw error;
        for (const n of data || []) {
          try {
            const page: ExtendedRecordMap = await notion.getPage(n.url);
            n.page = page;
          } catch (error: Error | any) {
            if (error?.message?.includes("Notion page not found")) {
              n.page = { isNotFound: true };
            } else {
              n.page = null;
            }
          }
        }
        return NextResponse.json({ isSuccess: true, notions: data, count });
      }
      case "search": {
        const keyword = req.nextUrl.searchParams.get("keyword") || "";
        const { data, count, error } = await getNotionsForSearch({
          page: Number(page),
          keyword: keyword,
        });
        if (error) throw error;
        for (const n of data || []) {
          try {
            const page: ExtendedRecordMap = await notion.getPage(n.url);
            n.page = page;
          } catch (error: Error | any) {
            if (error?.message?.includes("Notion page not found")) {
              n.page = { isNotFound: true };
            } else {
              n.page = null;
            }
          }
        }
        return NextResponse.json({ isSuccess: true, notions: data, count });
      }
      default:
        return NextResponse.json({ isSuccess: false, notions: [] });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ isSuccess: false, notions: [], error: error });
  }
}
