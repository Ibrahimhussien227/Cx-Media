"use client";

import CustomTable from "@/components/CustomTable";
import { columns, data } from "./config";
import { ColumnDef } from "@tanstack/react-table";

const CampaignsCapTable = () => {
  return (
    <div className="bg-white w-full overflow-x-scroll h-full no-scrollbar">
      {/* <CustomTable data={data} columns={columns} /> */}
      <CustomTable
        data={data}
        columns={columns as ColumnDef<{ _id?: string }>[]}
        // statusOptions={(!error && STATUSOPTIONS) || []}
        tableCount={17}
      />
    </div>
  );
};

export default CampaignsCapTable;
