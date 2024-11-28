import type { Metadata } from "next";
import "./globals.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Header from "@/components/layout/Header";
import Provider from "@/components/common/Provider";
import Loading from "@/components/common/Loading";

export const metadata: Metadata = {
  title: "Notion Log",
  description: "notion log",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Loading />
          <header className="mx-auto max-w-[1480px]">
            <Header />
          </header>
          <main className="mx-auto max-w-[1480px]">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
