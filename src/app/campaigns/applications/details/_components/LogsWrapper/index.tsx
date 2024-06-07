import ApplicationStatus from "@/components/ApplicationStatus";
import React from "react";
import { LOGSHEADERS, SELLERHEADERS } from "./configs";
import LogsList from "@/components/LogsList";
import useGetSellerDetailsForLogs from "@/hooks/services/seller/useGetSellerDetailsForLogs";
import { ILogsWrapperProps } from "./type";
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
    <div className="md:col-start-4 md:col-end-6 self-start h-screen overflow-y-scroll no-scrollbar">
      <div className="bg-white p-5 pb-0 mb-5">
        <h3 className="text-base font-bold mb-3 tracking-wide">
          Application Logs
        </h3>
        <ApplicationStatus
          label="Application STATUS"
          data={campaignAdminstration?.data?.campaignAdministrationLogs ?? []}
        />
      </div>
      <div className="bg-white p-5 pb-0 mb-5">
        <h3 className="text-base font-bold mb-3">Seller Details</h3>
        <LogsList logs={SELLERHEADERS} data={sellerDetails ?? {}} />
      </div>
      <div className="bg-white p-5 mb-[125px]">
        <h3 className="text-base font-bold mb-3">Administration Logs</h3>
        <LogsList logs={LOGSHEADERS} data={campaignAdminstration ?? {}} />
      </div>
    </div>
  );
};

export default LogsWrapper;
