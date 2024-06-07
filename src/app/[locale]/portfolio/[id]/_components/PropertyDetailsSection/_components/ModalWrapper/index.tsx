"use client";

import { useState } from "react";
import Link from "next/link";

import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import FormModal from "@/components/FormModal";
import GeneralInput from "@/components/GeneralInput";
import Modal from "@/components/Modal";
import RangeSlider from "@/components/RangeSlider";
import { FILTERPERIOD } from "./configs";

const ModalWrapper = ({ searchParams }: ISearchParamsProps) => {
  const [numOfShares, setNumOfShares] = useState("0");

  return (
    <>
      {searchParams.modal == "open" && (
        <FormModal>
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
              className="text-center mt-[10px] py-2 px-2 w-full font-bold text-[11px] bg-[#D4E4F2] rounded-sm text-secondary tracking-[1.5px] hover:text-secondary items-center justify-center"
              href={{ query: { modal: "false" } }}
            >
              CANCEL
            </Link>
            <Link
              href={{ query: { modal: "created" } }}
              className="mt-[10px] py-2 px-2 w-full font-bold text-[11px] bg-active text-xs text-white flex flex-row rounded-sm items-center justify-center"
            >
              CONFIRM
            </Link>
          </div>
        </FormModal>
      )}
      {searchParams.modal == "created" && (
        <Modal
          className="w-[320px]"
          title="Share Transfer Listing Created"
          description="You have successfully created your share transfer listing. You can manage your listing under ‘My Listings’ in the Transfers section. Note: Since the Share Transfer Window is currently closed, your listing has been added to the queue. Rest assured, we will reconfirm your listing with you once the window opens."
          // setShowModal={setShowModal}
          searchParams={searchParams}

          // setShowModal={() => {}}
        >
          <CustomButton className="transition-all delay-100 w-full py-2 bg-[#2C3A5C] text-[white] text-[10px] tracking-[1.5px] px-2 flex font-bold justify-center items-center rounded-[2px]">
            MANAGE
          </CustomButton>

          <Link
            href={{ query: { modal: "false" } }}
            className="bg-[#FF6C02] w-full py-2 px-2 text-white text-[10px] flex font-bold tracking-[1.5px] justify-center items-center rounded-[2px]"
          >
            OK
          </Link>
        </Modal>
      )}
    </>
  );
};

export default ModalWrapper;
