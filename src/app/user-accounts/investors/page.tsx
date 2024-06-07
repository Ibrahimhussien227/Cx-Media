"use client";

import React from "react";

import CustomTable from "@/components/CustomTable";

import { STATUSOPTIONS, columns } from "./configs";
import { ColumnDef } from "@tanstack/react-table";
import StatsCard from "@/components/StatsCard";
import { useGetInvestors } from "@/hooks/services/investor/getInvestorList";
import TableSkeleton from "@/components/Skeleton/Table";
import StatsSkeleton from "@/components/Skeleton/Stats";

const Investors = () => {
  const { investorList, investStats, isLoading, error } = useGetInvestors();

  if (error) return <div>Something went wrong...</div>;

  return (
    <section className="m-5">
      <nav className="flex flex-col items-start justify-start bg-white p-5">
        <h2 className="flex flex-row items-center justify-center mb-2 gap-2 font-medium">
          Investors
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {!isLoading ? (
            investStats?.map(({ count, investor_type }) => (
              <StatsCard
                icon="CheckCircle"
                key={count}
                title={investor_type}
                count={count}
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
      {investorList && !isLoading ? (
        <CustomTable
          data={investorList}
          columns={columns as ColumnDef<{ _id?: string }>[]}
          statusOptions={(!error && STATUSOPTIONS) || []}
        />
      ) : (
        <TableSkeleton />
      )}
    </section>
  );
};

export default Investors;
