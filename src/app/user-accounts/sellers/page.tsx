"use client";

import React from "react";

import CustomTable from "@/components/CustomTable";
import StatsCard from "@/components/StatsCard";
import { columns, STATUSOPTIONS } from "./configs";
import { ColumnDef } from "@tanstack/react-table";
import { useGetSellers } from "@/hooks/services/seller/getSellersList";
import StatsSkeleton from "@/components/Skeleton/Stats";
import TableSkeleton from "@/components/Skeleton/Table";

const Sellers = () => {
  const { sellerList, sellerStats, isLoading } = useGetSellers();
  return (
    <section className="m-5">
      <nav className="flex flex-col items-start justify-start bg-white p-5">
        <h2 className="flex flex-row items-center justify-center mb-2 gap-2 font-medium">
          Sellers
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {sellerList && sellerStats && !isLoading ? (
            sellerStats?.map(({ title, value, icon }) => (
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
      {sellerList && !isLoading ? (
        <CustomTable
          data={sellerList}
          columns={columns as ColumnDef<{ _id?: string }>[]}
          statusOptions={STATUSOPTIONS || {}}
        />
      ) : (
        <TableSkeleton />
      )}
    </section>
  );
};

export default Sellers;
