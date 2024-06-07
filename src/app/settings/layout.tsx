"use client";

import { usePathname } from "next/navigation";

// import LogsList from "@/components/LogsList";
// import Spinner from "@/components/Spinner";
import {
  // adminstrationLogsHeader,
  pageSections,
} from "./config";
import Link from "next/link";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathName = usePathname();

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
        <div className="flex gap-4">
          {pageSections.map((section) => {
            const isActive = section.href === pathName.split("settings")[1];

            return (
              <Link
                key={section.href}
                className={`mt-1 relative flex grow shrink-1 basis-0
                gap-4 border bg-gradient-blue-white p-4 w-[300px]
                ${isActive ? "" : "opacity-50"} ${
                  !isActive ? "cursor-pointer" : ""
                }`}
                href={`/settings/${section.href}`}
              >
                {isActive && (
                  <div className="absolute w-4 h-[0.15rem] top-[-0.09rem] left-4 bg-[#FF6C02]" />
                )}
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-primary font-bold text-[15px]">
                      {section.title}
                    </p>
                  </div>
                  <p className="text-[12px]">{section.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </header>
      <div className="grid md:grid-cols-5 gap-4 m-5">
        <div className="col-start-1 md:col-end-4 flex flex-col gap-4 h-screen">
          <div className="h-full overflow-y-scroll mb-[140px] no-scrollbar">
            {children}
          </div>
        </div>
        {/* {!isLoadingLogs ? (
          <div className=" md:col-start-4 md:col-end-6 h-screen overflow-y-scroll no-scrollbar">
            {campaignAdminstration && (
              <div className="bg-white p-5 pb-0 mb-[140px]">
                <h3 className="text-base font-bold mb-3 tracking-wide">
                  Adminstaration Logs
                </h3>
                <LogsList
                  logs={adminstrationLogsHeader}
                  data={campaignAdminstration}
                />
              </div>
            )}
          </div>
        ) : (
          <Spinner />
        )} */}
      </div>
    </section>
  );
}
