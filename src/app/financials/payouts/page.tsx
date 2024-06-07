"use client";

import { ColumnDef } from "@tanstack/react-table";

import CustomTable from "@/components/CustomTable";
import StatsCard from "@/components/StatsCard";
import { COLUMNS, STATUSOPTIONS } from "./configs";

const Payouts = () => {
  return (
    <section className="m-5">
      <div className="bg-white p-5 mb-3">
        <h2 className="mb-2 font-bold">Payouts</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Rental Yield Paid out"
            count="1434542"
            icon=""
          />
          <StatsCard
            title="Total Property Sale Paid out"
            count="1434542"
            icon=""
          />
          <StatsCard title="Total Funded Properties" count="22" icon="" />
          <StatsCard title="Total Platform Earnings" count="5135" icon="" />
        </div>
      </div>
      {/* {false ? (
        <TableSkeleton />
      ) : ( */}
      <div className="bg-white w-full overflow-x-scroll">
        <CustomTable
          data={[]}
          columns={COLUMNS as ColumnDef<{ _id?: string }>[]}
          statusOptions={STATUSOPTIONS || []}
        />
      </div>
      {/* )} */}
    </section>
  );
};

export default Payouts;
