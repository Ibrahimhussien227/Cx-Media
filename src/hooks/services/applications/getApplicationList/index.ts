// import { data } from "@/app/transfers/trades/config";
import { useSearchParams } from "next/navigation";
import {
  filterApplicationStatsInvestor,
  filterApplicationStatsSeller,
  filterInveAppsList,
  filterSellerAppsList,
} from "./utils";
import { IParams } from "./type";
import { useEffect, useState } from "react";
import {
  useGetSellerAppsStatsQuery,
  useLazyGetSellerAppsListQuery,
} from "@/store/services/sellers/applicationsApi";
import {
  useLazyGetInvAppsListQuery,
  useGetInvestorAppsStatsQuery,
} from "@/store/services/investors/applicationsApi/applicationList";

export const useGetApplications = (type: string) => {
  const searchParams = useSearchParams();
  const [stats, setStats] = useState<
    { title: string; icon: string; value: string | undefined }[]
  >([]);

  // stats apis
  const { data: InvestorAppstats, isLoading: isLoadingInvestorAppStats } =
    useGetInvestorAppsStatsQuery();
  const { data: SellerAppstats, isLoading: isLoadingSellerAppStats } =
    useGetSellerAppsStatsQuery();

  // apps apis
  const [
    getInvestorApplications,
    {
      data: investorApps,
      isLoading: investorAppsLoading,
      error: investorError,
    },
  ] = useLazyGetInvAppsListQuery();

  const [
    getSellerApplications,
    { data: sellerApps, isLoading: sellerAppsLoading, error: sellerError },
  ] = useLazyGetSellerAppsListQuery();

  useEffect(() => {
    const params: IParams = {
      // page: searchParams.get("page")?.toString(),
      sortBy: searchParams.get("sortBy")?.toString(),
      sortOrder: searchParams.get("sortOrder")?.toString(),
      limit: searchParams.get("limit")?.toString(),
      accountId: searchParams.get("accountId")?.toString(),
      applicationType: searchParams.get("applicationType")?.toString(),
      applicationStatus: searchParams.get("applicationStatus")?.toString(),
      applicationId: searchParams.get("applicationId")?.toString(),
      submittedOn: searchParams.get("submittedOn")?.toString(),
      lastUpdate: searchParams.get("lastUpdate")?.toString(),
      updatedBy: searchParams.get("v")?.toString(),
    };

    if (type === "investor") {
      getInvestorApplications({ params });
      setStats(filterApplicationStatsInvestor(InvestorAppstats?.result));
    } else if (type === "seller") {
      getSellerApplications({ params });
      setStats(filterApplicationStatsSeller(SellerAppstats?.data));
    } else if (type === "upgrade") console.log("fetch upgrade apps");
  }, [
    getInvestorApplications,
    getSellerApplications,
    SellerAppstats,
    InvestorAppstats,
    searchParams,
    type,
  ]);

  // table data
  const invAppsList = investorApps && filterInveAppsList(investorApps?.result);
  const sellerAppsList = sellerApps && filterSellerAppsList(sellerApps?.data);

  const list = type === "investor" ? invAppsList : sellerAppsList;

  return {
    applicationList: list,
    applicationStats: stats,
    error: investorError || sellerError,
    isLoading:
      (isLoadingInvestorAppStats && investorAppsLoading) ||
      (isLoadingSellerAppStats && sellerAppsLoading),
  };
};
