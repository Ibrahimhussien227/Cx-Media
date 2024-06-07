"use client";

import { columns, data } from "@/app/user-accounts/all/configs";
import CustomTable from "@/components/CustomTable";
import { ColumnDef } from "@tanstack/react-table";

const Payments = () => {
  return (
    <div>
      <div className="bg-white pt-5 w-full overflow-x-scroll">
        <div className="ml-5 text-[18px] tracking-wider font-bold">
          Transactions
        </div>
        <CustomTable
          data={data}
          columns={columns as ColumnDef<{ _id?: string }>[]}
        />
      </div>
    </div>
  );
};

export default Payments;
