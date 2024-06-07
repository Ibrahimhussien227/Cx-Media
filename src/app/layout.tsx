import type { Metadata } from "next";

import "@/../style/globals.css";
import Provider from "@/providers/provider";
import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "CX Media",
  description: "Admin panel",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="w-screen flex md:flex-row flex-col bg-[#F9F9F9] h-screen overflow-hidden antialiased">
        <Provider>
          <Sidebar />
          <main className="w-full overflow-x-scroll overflow-y-hidden">
            <Suspense>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
}
