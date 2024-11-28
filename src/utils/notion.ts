import { NotionDetail } from "@/types";
import { NotionDetailForES } from "@/types/entities/notionDetailForES";
import { NotionAPI } from "notion-client";
import {
  defaultMapImageUrl,
  getPageImageUrls,
  getPageTitle,
  getTextContent,
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

export const getNotionDetailForES = (page: any): Partial<NotionDetailForES> => {
  if (!page) return {};
  const title = getPageTitle(page)!;
  const description = [];
  for (const block in page.block) {
    const text = getTextContent(page.block[block].value?.properties?.title);
    description.push(text);
  }
  const result = {
    title,
    description,
  };
  return result;
};
