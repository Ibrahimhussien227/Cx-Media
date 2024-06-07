"use client";

import Link from "next/link";

import GeneralCheckbox from "@/components/GeneralCheckbox";
import PurchasesAccordion from "./_components/PurchasesAccordion";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const PurchaseDetails = ({
  searchParams,
  campaign,
}: {
  searchParams: ISearchParamsProps["searchParams"];
  campaign: ICampaignData["data"];
}) => {
  const router = useRouter();
  const pathName = usePathname();

  const { count } = searchParams;
  const { financialDetails } = campaign;

  const sharePrice = financialDetails?.sharePrice || 0;

  const params = new URLSearchParams(searchParams);

  return (
    <div className="flex flex-col w-full items-center bg-ver border-[1px] border-[#d4e4f285] p-[20px] mt-[15px] relative">
      <span className="absolute flex bg-[#FF6C02] h-[2px] w-[20px] top-[-1px] right-0 left-0 m-auto" />
      <p className="flex text-[10px] tracking-[1.5px] font-bold">
        YOUR ARE PURCHASING
      </p>
      <div className="flex text-[20px] font-MinionPro">
        {parseInt(count) * 1000}
        <span className="ml-1">Shares.</span>
      </div>
      <div className="flex flex-col my-[10px] w-[100%] border-b-[1px] pb-[10px] border-[#d4e4f285]">
        <div className="flex items-center justify-between mb-[5px]">
          <p className="text-secondary text-[10px] tracking-[1.5px] font-bold">
            COST OF SHARES
          </p>
          <p className="text-[16px] flex tracking-[0px]">
            {parseInt(count) * 1000 * sharePrice || "-"}
            <span className="flex text-secondary text-[12px] pt-[4px] pl-[5px]">
              AED
            </span>
          </p>
        </div>
        <PurchasesAccordion />
        <div className="flex items-center justify-between mb-[5px]">
          <p className="text-secondary text-[10px] tracking-[1.5px] font-bold">
            MANAGEMENT FEE
          </p>
          <p className="text-[16px] flex tracking-[0px]">
            _
            <span className="flex text-secondary text-[12px] pt-[4px] pl-[5px]">
              AED
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between mb-[5px]">
          <p className="text-secondary text-[10px] font-bold">PLATFORM FEE</p>
          <p className="text-[16px] flex tracking-[0px]">
            _
            <span className="flex text-secondary text-[12px] pt-[4px] pl-[5px]">
              AED
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between mb-[5px]">
          <p className="text-secondary text-[10px] font-bold">TAXES</p>
          <p className="text-[16px] flex tracking-[0px]">
            _
            <span className="flex text-secondary text-[12px] pt-[4px] pl-[5px]">
              AED
            </span>
          </p>
        </div>
      </div>
      <p className="text-[26px] flex mb-[8px] tracking-[0px]">
        _
        <span className="flex text-secondary text-[20px] pt-[6px] pl-[5px]">
          AED
        </span>
      </p>
      {/* TERMS CHECKBOX */}
      <GeneralCheckbox
        label="I accept the Investment Terms."
        onChange={(evt) => {
          params.set("terms", evt.target.checked.toString());
          router.replace(pathName + "?" + params);
        }}
      />
      <div className="flex mt-[20px] w-full">
        <Link
          href="."
          className="bg-[#D4E4F2] text-secondary w-[50%] text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] mr-3"
        >
          CANCEL
        </Link>
        <Link
          aria-disabled={!searchParams.terms}
          tabIndex={searchParams.terms ? -1 : undefined}
          href={`?count=${count}&otp=true`}
          className={`bg-[#FF6C02] text-white w-[50%] text-[10px] h-[30px] flex font-bold tracking-[1.5px] justify-center items-center px-[10px] rounded-[2px] ${
            !searchParams.terms && "opacity-50 pointer-events-none"
          }`}
        >
          CONFIRM
        </Link>
      </div>
    </div>
  );
};

export default PurchaseDetails;
