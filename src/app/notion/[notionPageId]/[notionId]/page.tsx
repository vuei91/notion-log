import Heart from "@/components/domain/notion/Heart";
import Renderer from "@/components/domain/notion/Renderer";
import { notion } from "@/utils/notion";

const NotionPage = async ({
  params,
}: {
  params: { notionPageId: string; notionId: string };
}) => {
  try {
    const notionData = await notion.getPage(params.notionPageId);
    const notionId = Number(params.notionId || -1);
    return (
      <div>
        <Heart notionId={notionId} />
        <Renderer
          recordMap={notionData}
          rootPageId={params.notionPageId}
          notionId={notionId}
        />
      </div>
    );
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
