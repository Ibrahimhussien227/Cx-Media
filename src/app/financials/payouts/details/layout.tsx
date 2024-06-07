"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import SectionCard from "@/components/SectionCard";
import { PAGESECTIONS } from "./config";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const searchParams = useSearchParams();

  return (
    <section className="h-full overflow-hidden no-scrollbar">
      <header className="bg-white flex flex-col items-start justify-between p-5">
        <div className="flex flex-row w-full justify-between">
          <Link
            href="."
            className="flex items-center gap-2 text-base font-bold"
          >
            Settings
          </Link>
        </div>
        <div className="grid md:grid-cols-4 gap-4 w-full">
          {PAGESECTIONS.map((section) => {
            return (
              <SectionCard
                key={section.href}
                title={section.title}
                description={section.description}
                href={section.href}
                searchParams={searchParams.get("id") ?? ""}
              />
            );
          })}
        </div>
      </header>
      {children}
    </section>
  );
}
