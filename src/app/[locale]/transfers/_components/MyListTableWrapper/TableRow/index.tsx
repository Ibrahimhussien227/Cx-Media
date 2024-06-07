"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CaretRight } from "@phosphor-icons/react";
import StatusText from "@/components/StatusText";
import { IRowComponent } from "./type";

const TableRow = ({ data }: IRowComponent) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleOnClick = () => {
    params.set("modal", "edit");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <tr
      className="default-custom-table cursor-pointer py-[20px] hover:bg-white group transition-all duration-500 ease-in-out overflow-visible"
      onClick={handleOnClick}
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
      {/* status */}
      <td className="w-[20%]">
        <div className="flex items-center justify-start">
          <StatusText text={data.status} />
        </div>
      </td>
      {/* shares */}
      <td className="w-[15%] text-start pl-3">
        <span className="font-MinionPro text-[16px]">{data.shares}</span>
      </td>
      {/* cost */}
      <td className="font-MinionPro text-[16px] w-[12%] pl-4 text-start">
        {data.cost}
        <span className="ml-1 text-[12px] font-thin text-secondary">AED</span>
      </td>
      {/* last update */}
      <td className="relative font-MinionPro text-[14px] w-[12%] pl-4 text-start text-secondary">
        {data.lastUpdate}
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
