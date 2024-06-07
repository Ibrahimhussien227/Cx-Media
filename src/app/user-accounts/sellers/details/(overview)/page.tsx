"use client";

import { ColumnDef } from "@tanstack/react-table";

import DetailItem from "@/components/TitleValueSpaceBetween";
import CustomTable from "@/components/CustomTable";
import StatusTag from "@/components/StatusTag";
import { columns, data } from "./config";
import { useSearchParams } from "next/navigation";
import useGetSellerDetails from "@/hooks/services/seller/getSellerDetails";

const Overview = () => {
  const searchParams = useSearchParams();
  const { sellerDetails } = useGetSellerDetails(searchParams.get("id")!);

  return (
    <div className=" bg-transparent">
      <div className="flex flex-row items-center w-full h-[54px] bg-white sticky top-0 shadow-sm">
        <div className="flex flex-row w-full items-center px-3">
          <h3
            className={`font-bold text-[18px] flex whitespace-nowrap opacity-60`}
          >
            Seller ID
          </h3>
          <h3 className="text-center text-[18px] font-bold w-fit mx-3">
            {sellerDetails?.other.sellerId}
          </h3>

          <StatusTag text={sellerDetails?.other.profileStatus} />
        </div>
      </div>
      <div className="flex flex-col bg-[#ffffff] mt-5">
        <div className="bg-white  px-3 font-bold flex gap-3 items-center justify-between">
          <h2 className="font-bold mt-3">{sellerDetails?.identity?.name}</h2>
        </div>
        <div className="flex flex-col py-3">
          <DetailItem
            title="Email Address"
            description={sellerDetails?.identity?.email}
          />
          <DetailItem title="Phone" description={"_"} />
          <DetailItem title="Country" description={"_"} />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="bg-white my-3 px-3 font-bold flex gap-3 items-center justify-between">
          <h2 className="font-bold ">Seller Type</h2>
          <StatusTag text={sellerDetails?.other.sellerType} />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="bg-white my-3 px-3 font-bold flex gap-3 items-center justify-between">
          <h2 className="font-bold ">KYC Status</h2>
          <StatusTag text={sellerDetails?.other.kycStatus} />
        </div>
        <span className="flex bg-[#F5FAFF] h-[2px] mx-3" />
        <div className="flex flex-col py-3">
          <div className="bg-white px-3 font-bold flex gap-3 items-center justify-between">
            <h2 className="font-bold">Total Campaigns</h2>
            <span className=" font-bold">
              {sellerDetails?.other.totalCampaigns}
            </span>
          </div>
          <div className="flex flex-col py-3">
            <DetailItem title="Unpublished" description={"_"} />
            <DetailItem title="Published" description={"_"} />
            <DetailItem title="Funded" description={"_"} />
            <DetailItem title="Exited" description={"_"} />
          </div>
        </div>
      </div>
      <div className="bg-white pt-5 w-full overflow-x-scroll mt-5">
        <CustomTable
          data={data}
          columns={columns as ColumnDef<{ _id?: string }>[]}
        />
      </div>
    </div>
  );
};

export default Overview;
