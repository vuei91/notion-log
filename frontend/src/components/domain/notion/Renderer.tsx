"use client";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { ReactNode } from "react";
import { NotionRenderer } from "react-notion-x";

import dynamic from "next/dynamic";

const Code = dynamic(() =>
  import("react-notion-x/build/third-party/code").then((m) => m.Code),
);
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then(
    (m) => m.Collection,
  ),
);
const Equation = dynamic(() =>
  import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  {
    ssr: false,
  },
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  {
    ssr: false,
  },
);

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
        Code,
        Collection,
        Equation,
        Modal,
        Pdf,
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
