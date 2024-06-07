"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react";

import StatusText from "@/components/StatusText";
import { IRowComponent } from "./type";

const TableRow = ({ data }: IRowComponent) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <tr
      className=" cursor-pointer py-[20px] hover:bg-white group transition-all duration-500 ease-in-out overflow-visible"
      onClick={() => router.push(pathname + "/" + data.id)}
    >
      <td className="flex flex-row items-center p-0 relative ">
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
        <div className="font-MinionPro p-3 text-[16px]">{data.name}</div>
      </td>
      {/* status */}
      <td className="w-[20%] mr-10">
        <div className="flex items-center justify-start">
          <StatusText text="ACTION REQUIRED" />
        </div>
      </td>
      {/* shares */}
      <td className="">
        <p className="font-MinionPro text-[16px] text-start">{data.shares}</p>
      </td>
      {/* earnings */}
      <td className="font-MinionPro text-[16px]  ">
        <div className="flex items-center text-center">
          {data.earnings}
          <p className="ml-1 text-[12px] font-thin text-secondary">AED</p>
        </div>
      </td>
      {/* purchased */}
      <td className="relative font-MinionPro text-[14px] w-[1%] text-secondary">
        {data.puschased}
      </td>
      <td className="relative font-MinionPro text-[16px]   w-[-1px] p-1 bg-[#FFFAF8] group-hover:bg-[#FFFAF8]">
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
