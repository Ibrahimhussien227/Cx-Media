"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react";

import { IRowComponent } from "./type";

const TableRow = ({ data }: IRowComponent) => {
  const router = useRouter();
  const pathname = usePathname();

  // const isTransfers =
  //   pathname.split("/").includes("transfers") && type == "AVAILABLE";

  return (
    <tr
      className="default-custom-table cursor-pointer py-[20px] hover:bg-white group transition-all duration-500 ease-in-out overflow-visible"
      onClick={() => router.push(pathname + "/" + data.id)}
    >
      <td className="flex flex-row items-center p-0 relative">
        {/* Flat Div */}
        <div
          className="bg-active text-[white] w-[20px] h-[2px] top-[-1px] left-24 absolute opacity-0
          transition-opacity ease-in-out group-hover:opacity-100 group-hover:duration-300 group-hover:delay-150"
        />
        {/* image and title */}
        <div className="h-full flex justify-start items-start start">
          <Image
            src="/images/testImage.jpg"
            alt="property"
            width={70}
            height={70}
          />
        </div>
        <div className="font-MinionPro p-4 text-[16px]">{data.listing}</div>
      </td>
      {/* shares */}
      <td className="w-[12%] mr-10 pl-4">
        <div className="flex items-center justify-start">{data.shares}</div>
      </td>
      {/* costs */}
      <td className="w-[12%] text-start pl-3">
        <span className="font-MinionPro text-[16px]">{data.costs}</span>
      </td>
      {/* return */}
      <td className="font-MinionPro text-[16px] w-[8%] pl-4 text-start">
        {data.return}
        <span className="ml-1 text-[12px] font-thin text-secondary">%</span>
      </td>
      {/* appreciation */}
      <td className="relative font-MinionPro text-[14px] w-[10%] pl-4 text-start text-secondary">
        {data.appreciation}
        <span className="ml-1 text-[12px] font-thin text-secondary">%</span>
      </td>
      {/* gross yield */}
      <td className="relative font-MinionPro text-[14px] w-[8%] pl-4 text-start text-secondary">
        {data.grossYield}
        <span className="ml-1 text-[12px] font-thin text-secondary">%</span>
      </td>
      {/* net yield */}
      <td className="relative font-MinionPro text-[14px] w-[8%] pl-4 text-start text-secondary">
        {data.netYield}
        <span className="ml-1 text-[12px] font-thin text-secondary">%</span>
      </td>
      {/* listed on */}
      <td className="relative font-MinionPro text-[14px] w-[12%] pl-4 text-start text-secondary">
        {data.listingOn}
      </td>
      <td className="relative font-MinionPro text-[16px] w-[-1px] p-1 bg-[#FFFAF8] group-hover:bg-[#FFFAF8]">
        <div
          className="absolute bg-active text-[white] rounded-[50%] px-1 py-1 top-[calc(50%-13px)] left-[-12px] opacity-0 
          transition-opacity ease-in-out group-hover:opacity-100 group-hover:duration-300 group-hover:delay-150 z-50"
        >
          <CaretRight color="white" />
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
