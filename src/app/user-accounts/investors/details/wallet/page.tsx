"use client";

import { columns, data } from "@/app/user-accounts/all/configs";
import CustomTable from "@/components/CustomTable";
import TabBar from "@/components/TabBar";
import { ColumnDef } from "@tanstack/react-table";
import { TABOPTIONS } from "./config";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

const Wallet = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );

  return (
    <div>
      <div className="bg-white pt-5 w-full overflow-x-scroll">
        <div className="flex justify-start">
          <div className="ml-5 text-[18px] tracking-wider font-bold">
            Wallet Balance
          </div>
          <TabBar
            className="ml-3"
            options={TABOPTIONS}
            value={
              TABOPTIONS.find((op) => op.value === searchParams?.get("type")) ||
              TABOPTIONS[0]
            }
            onChange={(clickedTab) => {
              params.set("type", clickedTab.value);
              router.replace(`${pathname}?${params.toString()}`);
            }}
          />
        </div>
        <div className="ml-5 text-[35px] tracking-wider font-bold pb-2">
          0.00 AED
        </div>
        <div className="w-full border-b" />
        <CustomTable
          data={data}
          columns={columns as ColumnDef<{ _id?: string }>[]}
        />
      </div>
    </div>
  );
};

export default Wallet;
