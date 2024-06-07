"use client";

import StatsCard from "@/components/StatsCard";
import { STATUSOPTIONS, columns, data, statsData } from "./configs";
import CustomTable from "@/components/CustomTable";
import { ColumnDef } from "@tanstack/react-table";

const AllUsers = () => {
  return (
    <section className="m-5">
      <div className="bg-white p-5 mb-3">
        <h2 className="font-bold">All Users</h2>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full">
          {statsData?.map(({ title, count }) => (
            <StatsCard key={count} title={title} count={count} icon="" />
          ))}
        </div>
      </div>
      <div className="bg-white pt-5 w-full overflow-x-scroll">
        <CustomTable
          data={data}
          statusOptions={STATUSOPTIONS || {}}
          columns={columns as ColumnDef<{ _id?: string }>[]}
        />
      </div>
    </section>
  );
};

export default AllUsers;
