import { NotionDetail } from "@/types/entities/notionDetail";
import { NotionAPI } from "notion-client";
import {
  defaultMapImageUrl,
  getPageImageUrls,
  getPageTitle,
  getTextContent,
  parsePageId,
} from "notion-utils";

export const notion = new NotionAPI();

export const getNotionDetail = async (
  url: string,
): Promise<Partial<NotionDetail> | undefined> => {
  const pageId = parsePageId(url);
  if (!pageId) {
    console.error("페이지 아이디가 없습니다");
    return;
  }
  const page = await notion.getPage(pageId);
  if (!page) {
    console.error("페이지가 없습니다");
    return;
  }
  const title = getPageTitle(page)!;
  const images = getPageImageUrls(page, {
    mapImageUrl: defaultMapImageUrl as any,
  });
  const text = [];
  const blocks = Object.keys(page.block).slice(0, 15); // 첫 두 개만 선택
  for (const block of blocks) {
    text.push(getTextContent(page.block[block].value?.properties?.title));
  }
  const description = text.join("\n");
  const result = {
    title,
    description,
    thumbnail: images[0],
    url,
  };
  return result;
};
