"use client";

import DetailItem from "@/components/TitleValueSpaceBetween";
import StatusTag from "@/components/StatusTag";
import { useSearchParams } from "next/navigation";
import useGetInvestorDetails from "@/hooks/services/investor/getInvestorDetails";

const Overview = () => {
  const searchParams = useSearchParams();
  const { investorDetails } = useGetInvestorDetails(searchParams.get("id")!);

  return (
    <div className=" bg-transparent">
      <div className="flex flex-row items-center w-full h-[54px] bg-white sticky top-0 shadow-sm">
        <div className="flex flex-row w-full items-center px-3">
          <h3
            className={`font-bold text-[18px] flex whitespace-nowrap opacity-60`}
          >
            Investor ID
          </h3>
          <h3 className="text-center text-[18px] font-bold w-fit mx-3">
            {investorDetails?.other.investorId}
          </h3>

          {investorDetails && (
            <StatusTag text={investorDetails.other.profileStatus} />
          )}
        </div>
      </div>
      <div className="flex flex-col bg-[#ffffff] mt-5">
        <div className="bg-white  px-3 font-bold flex gap-3 items-center justify-between">
          <h2 className="font-bold mt-3">{investorDetails?.identity.name}</h2>
        </div>
        <div className="flex flex-col py-3">
          <DetailItem
            title="Email Address"
            description={investorDetails?.identity.email}
          />
          <DetailItem
            title="Phone"
            description={investorDetails?.identity.phoneNumber}
          />
          <DetailItem
            title="Country"
            description={investorDetails?.residentialAddress.country}
          />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="bg-white my-3 px-3 font-bold flex gap-3 items-center justify-between">
          <h2 className="font-bold ">Account Level</h2>
          <StatusTag text={`${investorDetails?.other.accountLevel}`} />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="bg-white my-3 px-3 font-bold flex gap-3 items-center justify-between">
          <h2 className="font-bold ">KYC Status</h2>
          <StatusTag text={`${investorDetails?.kycStatus.kycStatus}`} />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="flex flex-col py-3">
          <div className="bg-white px-3 font-bold flex gap-3 items-center justify-between">
            <h2 className="font-bold">Wallet Balance</h2>
            <span className=" font-bold">_ AED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
