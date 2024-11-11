import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

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
        <header className="max-w-[1480px] mx-auto">
          <Header />
        </header>
        <main className="max-w-[1480px] mx-auto">{children}</main>
      </body>
    </html>
  );
}
