"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";

import TabBar from "@/components/TabBar";
import StatsCard from "@/components/StatsCard";
import CustomTable from "@/components/CustomTable";
// import StatsSkeleton from "@/components/StatsCard/StatsSkeleton";
// import TableSkeleton from "@/components/CustomTable/_comps/Skeleton";
import {
  TABOPTIONS,
  COLUMNS,
  STATUSOPTIONS,
  STATSARRAY,
  DATA,
} from "./configs";
import TransactionModal from "./_comps/TransactionModal";

const AllTransactions = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <section className="m-5">
      {showModal && <TransactionModal setShowModal={setShowModal} />}
      <div className="bg-white p-5 mb-3">
        <nav className="flex flex-col md:flex-row mb-2 gap-2">
          <h2 className="font-bold">Published Campaigns</h2>
          <TabBar
            options={TABOPTIONS}
            value={
              TABOPTIONS.find((op) => op.value === searchParams?.get("type")) ||
              TABOPTIONS[0]
            }
            onChange={(clickedTab) =>
              router.replace(pathname + "?type=" + clickedTab.value)
            }
          />
        </nav>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {
            // false
            //   ? Array.from({ length: 4 }).map((_, index) => (
            //       <StatsSkeleton key={index} />
            //     ))
            //   :
            STATSARRAY.map(({ title, count, icon }) => (
              <StatsCard
                key={`${title}${count}`}
                title={title}
                count={count}
                icon={icon}
              />
            ))
          }
        </div>
      </div>
      {/* {false ? (
        <TableSkeleton />
      ) : ( */}
      <div className="bg-white w-full overflow-x-scroll">
        <CustomTable
          setShowModal={setShowModal}
          data={
            DATA?.map((item) => ({
              _id: item.transactionId,
              ...item,
            })) || []
          }
          columns={COLUMNS as ColumnDef<{ _id?: string }>[]}
          statusOptions={STATUSOPTIONS || []}
        />
      </div>
      {/* )} */}
    </section>
  );
};

export default AllTransactions;
