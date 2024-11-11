import Renderer from "@/components/domain/notion/Renderer";
import { notion } from "@/utils/notion";

const NotionPage = async ({ params }: { params: { id: string } }) => {
  try {
    const notionData = await notion.getPage(params.id);
    return <Renderer recordMap={notionData} rootPageId={params.id} />;
  } catch (error: Error | any) {
    if (error?.message?.includes("Notion page not found")) {
      return (
        <div className="flex h-[calc(100vh_-_200px)] w-full items-center justify-center">
          <div className="text-3xl font-bold">
            노션페이지를 웹페이지 게시해주세요!
          </div>
        </div>
      );
    }
    return error?.message;
  }
};

export default NotionPage;
