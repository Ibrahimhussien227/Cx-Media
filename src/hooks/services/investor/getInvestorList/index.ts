import { useSearchParams } from "next/navigation";
// import { data } from "@/app/transfers/trades/config";
import {
  useGetInvestorStatsQuery,
  useGetListInvestorsQuery,
} from "@/store/services/investors/investorsApi/investorsList";
import { filterInvestorsList } from "./utils";
import { IParams } from "./type";

export const useGetInvestors = () => {
  const searchParams = useSearchParams();
  const params: IParams = {
    page: searchParams.get("page")?.toString(),
    sortBy: searchParams.get("sortBy")?.toString(),
    sortOrder: searchParams.get("sortOrder")?.toString(),
    limit: searchParams.get("limit")?.toString(),

    // userId: searchParams.get("_id")?.toString(),
    accountName: searchParams.get("fullName")?.toString(),
    // accountLevel: searchParams.get("accountLevel")?.toString(),
    profileCompletionStatus: searchParams.get("profileStatus")?.toString(),
    kycStatus: searchParams.get("kycStatus")?.toString(),
    IsBankDetailsUpdated: searchParams.get("bankAccount")?.toString(),
    emailId: searchParams.get("email")?.toString(),
    mobileNumber: searchParams.get("phone")?.toString(),
    // accountId: searchParams.get("accountId")?.toString(),
    accountCreationDate: searchParams.get("createdAt")?.toString(),
    lastUpdateTimestamp: searchParams.get("updatedAt")?.toString(),
  };

  // stats
  const { data: statsData, isLoading: isLoadingStats } =
    useGetInvestorStatsQuery();
  const stats = statsData?.result.investorsByType;

  // table
  const {
    data: listData,
    isLoading: isLoadingInvestorList,
    error,
  } = useGetListInvestorsQuery({ params });
  const list = listData && filterInvestorsList(listData.result);

  return {
    investorList: list,
    investStats: stats,
    isLoading: isLoadingStats && isLoadingInvestorList,
    error,
  };
};
