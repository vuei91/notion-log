"use client";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { ReactNode } from "react";
import { NotionRenderer } from "react-notion-x";

interface RendererProps {
  recordMap: ExtendedRecordMap;
  rootPageId: string;
}
const Renderer = ({ recordMap, rootPageId }: RendererProps) => {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      rootPageId={rootPageId}
      previewImages
      components={{
        Collection: null,
        PageLink: (e: {
          children: ReactNode;
          href: string;
          className: string;
        }) => {
          return (
            <Link href={`/notion/${e.href}`} className={e.className}>
              {e.children}
            </Link>
          );
        },
      }}
    />
  );
};

export default Renderer;
