import Link from "next/link";

import CustomButton from "@/components/CustomButton";
import StatusText from "@/components/StatusText";
import { IHoldingsCard } from "./type";
import DownloadWrapper from "@/components/DownloadWrapper";

const HoldingsCard = ({ data }: IHoldingsCard) => {
  return (
    <div className="flex flex-col border-[1px] border-[#d4e4f285] bg-white rounded-sm p-4 mt-5 relative">
      <span className="absolute flex bg-[#FF6C02] h-[2px] w-[10px] top-[-1px] right-0 left-0 m-auto" />
      <p className="text-[10px] text-secondary font-bold">YOUR HOLDINGS</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center font-MinionPro w-[50%]">
          <p className="text-[20px]">3,000</p>
          <p className="text-secondary text-[12px] mt-2 ml-1">Shares</p>
        </div>
        <div className="flex items-center font-MinionPro w-[50%]">
          <p className="text-[20px]">1.55</p>
          <p className="text-secondary text-[12px] mt-2 ml-1">AED/Share</p>
        </div>
      </div>
      <StatusText text={data.status} />

      {/* TEXT */}
      {data.status == "ACTION REQUIRED" ? (
        <p className="text-[#93A0C3] text-[12px] tracking-[0px]">
          We could not complete your request due to unavailability of shares.
        </p>
      ) : (
        data.status == "CONFIRMED" && (
          <p className="text-[#93A0C3] text-[12px] tracking-[0px]">
            Your investment is confirmed. The share certificates for your
            investment will be issued at the end of the campaign.
          </p>
        )
      )}

      {/* Download */}
      {data.status == "COMPLETE" && (
        <>
          <DownloadWrapper
            value="Share Certificate"
            className="my-2"
            colored
            readOnly
          />
          <DownloadWrapper
            value="Title Dead"
            className="mb-2"
            colored
            readOnly
          />
          <DownloadWrapper
            value="Title Dead"
            className="mb-2"
            colored
            readOnly
          />
        </>
      )}

      {/* Buttons */}
      <div className="w-full flex justify-center items-center gap-2">
        {data.status == "ACTION REQUIRED" && (
          <CustomButton className="mt-[10px] py-2 px-2 w-full font-bold text-[11px] bg-[#D4E4F2] rounded-sm text-secondary tracking-[1.5px] hover:text-secondary flex items-center justify-center">
            VIEW OPTIONS
          </CustomButton>
        )}
        {data.status == "COMPLETE" && (
          <Link
            href={{ query: { modal: "open" } }}
            className=" text-center mt-[10px] py-2  w-full px-2 font-bold text-[11px] bg-default rounded-sm text-white tracking-[1.5px] hover:text-secondary items-center justify-center"
          >
            LIST FOR SALE
          </Link>
        )}
        {data.status == "QUEUED" && (
          <>
            <CustomButton className="mt-[10px] py-2 px-2 w-full font-bold text-[11px] bg-[#D4E4F2] rounded-sm text-secondary tracking-[1.5px] hover:text-secondary flex items-center justify-center">
              CANCEL
            </CustomButton>
            <CustomButton className="mt-[10px] py-2  w-full px-2 font-bold text-[11px] bg-default rounded-sm text-white tracking-[1.5px] hover:text-secondary items-center justify-center">
              MANAGE
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
};

export default HoldingsCard;
