"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import CustomTable from "@/components/CustomTable";
import TabBar from "@/components/TabBar";
import { STATUSOPTIONS, InvColumns, SelColumns, tabOptions } from "./configs";
import { ColumnDef } from "@tanstack/react-table";
import { useGetApplications } from "@/hooks/services/applications/getApplicationList";
import StatsCard from "@/components/StatsCard";
import StatsSkeleton from "@/components/Skeleton/Stats";
import TableSkeleton from "@/components/Skeleton/Table";

const Applications = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type")?.toString() ?? "investor";

  const { applicationList, applicationStats, isLoading, error } =
    useGetApplications(type);

  return (
    <section className="m-5">
      <nav className="flex flex-col items-start justify-start bg-white p-5">
        <div className="flex flex-row items-center justify-center mb-2 gap-2">
          <h2 className="font-medium">Applications</h2>
          <TabBar
            options={tabOptions}
            value={
              tabOptions.find((op) => op.value === searchParams?.get("type")) ||
              tabOptions[0]
            }
            onChange={(clickedTab) =>
              router.replace(pathname + `?type=` + clickedTab.value)
            }
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {applicationList && applicationStats && !isLoading ? (
            applicationStats?.map(({ title, value, icon }) => (
              <StatsCard
                key={`${title}${value}`}
                title={title}
                count={value ?? ""}
                icon={icon}
              />
            ))
          ) : (
            <>
              <StatsSkeleton />
              <StatsSkeleton />
              <StatsSkeleton />
              <StatsSkeleton />
            </>
          )}
        </div>
      </nav>
      <div className="bg-white pt-5 w-full overflow-x-scroll">
        {applicationList && applicationStats && !isLoading ? (
          <CustomTable
            hrefDetails={type}
            data={applicationList || []}
            columns={
              (type == "investor" ? InvColumns : SelColumns) as ColumnDef<{
                _id?: string;
              }>[]
            }
            statusOptions={(!error && STATUSOPTIONS) || {}}
          />
        ) : (
          <TableSkeleton />
        )}
      </div>
    </section>
  );
};

export default Applications;
