"use client";

import React, { useState } from "react";
import Link from "next/link";

import CustomButton from "@/components/CustomButton";
import DetailsCard from "@/components/DetailsCard";
import FormModal from "@/components/FormModal";
import GeneralInput from "@/components/GeneralInput";
import RangeSlider from "@/components/RangeSlider";
import StatusText from "@/components/StatusText";
import { Trash } from "@/utils/icons";

const EditModal = ({ searchParams }: ISearchParamsProps) => {
  const [numOfShares, setNumOfShares] = useState("0");

  return (
    <FormModal searchParams={searchParams}>
      <div className="w-full flex flex-row items-center justify-between mb-2">
        <p className="text-[18px] font-MinionPro font-[500]">
          Managing Listing
        </p>
        <StatusText text="TRANSFERRED" />
      </div>
      <DetailsCard />
      <div className="flex flex-col gap-2 mt-2">
        <RangeSlider
          forModal
          title="SELECT NUMBER OF SHARES"
          value={numOfShares}
          min={10000}
          max={200000}
          step={1000}
          color="green-prograss-bar"
          changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNumOfShares(e.target.value);
          }}
        >
          <div />
        </RangeSlider>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <div className="text-secondary text-[10px] font-bold font=-[700] tracking-widest">
          SET SALE PRICE PER SHARE
        </div>
        <div className="w-full flex flex-row border">
          <GeneralInput className="border-[0px] pl-2" type="text" />
          <div className="flex justify-center items-center px-2">AED</div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-2 w-full mt-3">
        <div className="flex justify-center items-center p-1 border rounded-full bg-white">
          <Trash size={15} />
        </div>
        <div className="flex flex-row gap-3 w-full ">
          <Link
            href={{ query: { ...searchParams, modal: false } }}
            className=" py-2 px-2 w-full font-bold text-[11px] bg-[#D4E4F2] rounded-sm text-secondary tracking-[1.5px] hover:text-secondary flex items-center justify-center"
            // onClick={() =>
            //   router.replace(pathname + "?" + searchParamsArray.join("&"))
            // }
          >
            CANCEL
          </Link>
          <CustomButton className=" py-2 px-2 w-full font-bold text-[11px] bg-active text-xs text-white flex flex-row rounded-sm items-center justify-center">
            UPDATE
          </CustomButton>
        </div>
      </div>
    </FormModal>
  );
};

export default EditModal;
