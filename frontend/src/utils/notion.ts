import { Notion } from "@/types";
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
): Promise<Partial<Notion> | undefined> => {
  const pageId = parsePageId(url);
  if (!pageId) return;
  const page = await notion.getPage(pageId);
  if (!page) return;
  const title = getPageTitle(page)!;
  const images = getPageImageUrls(page, {
    mapImageUrl: defaultMapImageUrl as any,
  });
  const text = [];
  for (const block in page.block) {
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
