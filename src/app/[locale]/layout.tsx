import type { Metadata } from "next";
import { Suspense } from "react";

import Provider from "@/providers";
import { Locale } from "@/types/localLanguage";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/../styles/globals.css";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "CX Media",
  description: "CX Media Landing Page",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <html lang={locale}>
      <body className="mx-auto h-screen w-full flex flex-col overflow-hidden">
        <Navbar />
        <div className="h-full overflow-y-scroll no-scrollbar">
          <Provider locale={locale}>
            <Suspense fallback={<Loading />}>
              <main>{children}</main>
            </Suspense>
          </Provider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
