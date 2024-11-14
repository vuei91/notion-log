import type { Metadata } from "next";
import "./globals.css";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import Header from "@/components/layout/Header";
import { revalidatePath } from "next/cache";

export const metadata: Metadata = {
  title: "Notion Log",
  description: "notion log",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const refreshServer = async (path: string) => {
    "use server";
    revalidatePath(path);
  };
  return (
    <html lang="en">
      <body>
        <header className="mx-auto max-w-[1480px]">
          <Header refreshServer={refreshServer} />
        </header>
        <main className="mx-auto max-w-[1480px]">{children}</main>
      </body>
    </html>
  );
}
