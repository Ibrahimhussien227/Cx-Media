"use client";

import { ArrowLeft } from "@/utils/icons";
import LogsListSkeleton from "@/components/Skeleton/Logs";

export default function PageSkeleton({
  children,
  withHeader,
  withLogs,
}: {
  children: React.ReactNode;
  withHeader?: boolean;
  withLogs?: boolean;
}) {
  return (
    <section className="h-full overflow-hidden animate-pulse">
      <header className="bg-white flex flex-col items-start justify-between p-5">
        <div className="flex flex-row w-full justify-between">
          <div className="flex items-center gap-2 text-base font-bold mb-2">
            <ArrowLeft size={24} color="#D4E4F2" />
            <div className="h-2 w-[100px] bg-[#D4E4F2] rounded" />
          </div>
        </div>
        {withHeader && (
          <div className="flex gap-4 w-full">
            {Array.from({ length: 4 }).map((_, index) => {
              return (
                <section
                  key={index}
                  className="mt-1 relative flex grow shrink-1 basis-0 gap-4 border bg-gradient-blue-white p-5 w-[300px]"
                >
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row justify-between items-center mb-3">
                      <p className="h-2 w-[80px] bg-[#D4E4F2] rounded"></p>
                    </div>
                    <p className="h-2 w-[180px] bg-[#D4E4F2] rounded"></p>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </header>

      <div className="grid md:grid-cols-5 gap-4 m-5">
        <div className="  col-start-1 md:col-end-4 flex flex-col gap-4">
          <div className="h-full overflow-y-scroll mb-[140px] no-scrollbar">
            {children}
          </div>
        </div>
        {/* LOGS */}
        {withLogs && (
          <div className="md:col-start-4 md:col-end-6 no-scrollbar">
            <div className="bg-white p-5 pb-0 mb-5">
              <div className="h-2 mb-4 w-[100px] bg-[#D4E4F2] rounded" />
              <LogsListSkeleton />
            </div>

            <div>
              <div className="bg-white p-5 pb-0 mb-5">
                <div className="h-2 mb-4 w-[100px] bg-[#D4E4F2] rounded" />
                <LogsListSkeleton />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
