import { notion } from "@/utils/notion";
import { redirect } from "next/navigation";
import {
  defaultMapImageUrl,
  getPageImageUrls,
  getPageTitle,
  getTextContent,
  parsePageId,
} from "notion-utils";

const About = async ({ searchParams }: { searchParams: { id: string } }) => {
  // notion checking
  const url = searchParams.id;
  const pageId = parsePageId(url);
  if (!pageId) return;
  const page = await notion.getPage(pageId);
  if (!page) return;
  const title = getPageTitle(page);
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
  redirect(
    "/notion/create/?data=" + encodeURIComponent(JSON.stringify(result)),
  );
};

export default About;
