import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useGetAllCampaignQuery } from "@/store/services/campaignAdmin/listCampaignApi";
import { useGetCampaignStatsQuery } from "@/store/services/campaignAdmin/campaignStatsApi";
import { useGetApplicationStatsQuery } from "@/store/services/campaignAdmin/applicationStatsApi";
import {
  filterApplicationsStats,
  filterCampaing,
  filterCampaingStats,
} from "./utils";
import { IUseGetCampaignsProps } from "./type";

const useGetCampaigns = ({ statsType }: IUseGetCampaignsProps) => {
  const [stats, setStats] = useState<
    { title: string; icon: string; value: string | undefined }[]
  >([]);
  const searchParams = useSearchParams();
  const params = {
    page: searchParams.get("page")?.toString(),
    campaignId: searchParams.get("campaignId")?.toString(),
    assetName: searchParams.get("assetName")?.toString(),
    sellerId: searchParams.get("sellerId")?.toString(),
    propertyPrice: searchParams.get("propertyPrice")?.toString(),
    sharePrice: searchParams.get("sharePrice")?.toString(),
    campaignCreationTimestamp: searchParams
      .get("campaignCreationTimestamp")
      ?.toString(),
    campaignPublishingTimestamp: searchParams
      .get("campaignPublishingTimestamp")
      ?.toString(),
    campaignCloseTimestamp: searchParams
      .get("campaignCloseTimestamp")
      ?.toString(),
    sortBy: searchParams.get("sortBy")?.toString(),
    sortOrder: searchParams.get("sortOrder")?.toString(),
    campaignStatus: searchParams.get("campaignStatus")?.toString(),
    reviewStatus: searchParams
      .get("reviewStatus")
      ?.toString()
      ?.split("+")
      .join(" "),
  };

  const {
    data: structuredData,
    error,
    isLoading: isLoadingCampaing,
  } = useGetAllCampaignQuery(
    { params },
    {
      selectFromResult: ({ data, error, isLoading }) => ({
        data: { data: filterCampaing(data?.data) || [], count: data?.count },
        error,
        isLoading,
      }),
    },
  );

  // const [getCampStats, { data: campStats, isLoading: isLoadingCampStats }] =
  //   useLazyGetCampaignStatsQuery();

  const { data: campStats, isLoading: isLoadingCampStats } =
    useGetCampaignStatsQuery();
  const { data: appStats, isLoading: isLoadingAppStats } =
    useGetApplicationStatsQuery();

  useEffect(() => {
    if (statsType === "campaign") {
      setStats(filterCampaingStats(campStats?.data));
    } else {
      setStats(filterApplicationsStats(appStats?.data));
    }
  }, [campStats, appStats, statsType]);

  return {
    stats,
    tableCount: structuredData?.count,
    structuredData,
    isLoading: isLoadingCampaing || isLoadingCampStats || isLoadingAppStats,
    error,
  };
};

export default useGetCampaigns;
