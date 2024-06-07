"use client";

import React, { useState } from "react";
import Link from "next/link";

import CustomSelect from "@/components/CustomSelect";
import FormModal from "@/components/FormModal";
import RangeSlider from "@/components/RangeSlider";
import GeneralInput from "@/components/GeneralInput";
import CustomButton from "@/components/CustomButton";
import { FILTERPERIOD } from "./configs";

const CreateModal = ({ searchParams }: ISearchParamsProps) => {
  const [numOfShares, setNumOfShares] = useState("0");

  return (
    <FormModal searchParams={searchParams}>
      <div className="w-full flex flex-col items-center justify-center mb-3">
        <p className="text-[18px] font-MinionPro font-[500]">
          Create Transfer Listing
        </p>
        <div className="h-[2px] w-6 my-2 bg-[#FF6C02]" />
        <h2 className="text-center mb-2">
          Please complete the form to create your share transfer listing.
        </h2>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        <div className="text-secondary text-[10px] font-bold tracking-widest">
          SELECT PROPERTY HOLDING
        </div>
        <CustomSelect
          withSearch
          className="w-full"
          value={FILTERPERIOD[0]}
          options={FILTERPERIOD}
        />
      </div>
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
      <div className="flex flex-row gap-3">
        <Link
          className="mt-[10px] px-2 py-2 flex w-full font-bold text-[11px] bg-[#D4E4F2] rounded-sm text-secondary tracking-[1.5px] hover:text-secondary items-center justify-center"
          href={{ query: { ...searchParams, modal: false } }}
        >
          CANCEL
        </Link>
        <CustomButton className="mt-[10px] px-2 py-2 w-full font-bold text-[11px] bg-active text-xs text-white flex flex-row rounded-sm items-center justify-center">
          UPDATE
        </CustomButton>
      </div>
    </FormModal>
  );
};

export default CreateModal;
