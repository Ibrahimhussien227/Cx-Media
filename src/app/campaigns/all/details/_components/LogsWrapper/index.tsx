import React from "react";
import { LOGSHEADERS, SELLERHEADERS } from "./configs";
import LogsList from "@/components/LogsList";
import useGetSellerDetailsForLogs from "@/hooks/services/seller/useGetSellerDetailsForLogs";
import { ILogsWrapperProps } from "./type";
import { ArrowSquareOut } from "@/utils/icons";
import Link from "next/link";
import { useGetCampaignAdminstrationQuery } from "@/store/services/campaigns/campaignAdminstration";

const LogsWrapper = ({ campaignId, sellerId }: ILogsWrapperProps) => {
  const { data: campaignAdminstration, isLoading: isLoadingLogs } =
    useGetCampaignAdminstrationQuery({
      campaignId,
      administrationType: "REVIEW",
    });

  const { sellerDetails, isLoadingSellerDetails } =
    useGetSellerDetailsForLogs(sellerId);

  if (isLoadingLogs || isLoadingSellerDetails) return <div>...Loading</div>;

  return (
    <div className="md:col-start-4 md:col-end-6 self-start overflow-scroll no-scrollbar h-full">
      <div className="bg-white p-5 pb-0 mb-5">
        <div className="flex flex-row w-full justify-between">
          <h3 className="text-base font-bold mb-3">Seller Details</h3>
          <Link href={`/sellers?id=${sellerId}`}>
            <ArrowSquareOut width={20} height={20} />
          </Link>
        </div>
        <LogsList logs={SELLERHEADERS} data={sellerDetails ?? {}} />
      </div>
      <div className="bg-white p-5 mb-[125px]">
        <h3 className="text-base font-bold mb-3">Administration Logs</h3>
        <LogsList logs={LOGSHEADERS} data={campaignAdminstration?.data ?? {}} />
      </div>
    </div>
  );
};

export default LogsWrapper;
