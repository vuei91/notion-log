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

export const getNotionDetail = (page: any): Partial<NotionDetail> => {
  if (!page) return {};
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
  };
  return result;
};
