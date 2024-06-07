// import { data } from "@/app/transfers/trades/config";
import { useSearchParams } from "next/navigation";
import { filterSellerStats, filterSellersList } from "./utils";
import { IParams } from "./type";
import {
  useGetListSellersQuery,
  useGetSellerStatsQuery,
} from "@/store/services/sellers/listApi";

export const useGetSellers = () => {
  const searchParams = useSearchParams();
  const params: IParams = {
    page: searchParams.get("page")?.toString(),
    sortBy: searchParams.get("sortBy")?.toString(),
    sortOrder: searchParams.get("sortOrder")?.toString(),
    limit: searchParams.get("limit")?.toString(),

    userId: searchParams.get("_id")?.toString(),
    sellerName: searchParams.get("fullName")?.toString(),
    sellerType: searchParams.get("sellerType")?.toString(),
    accountStatus: searchParams.get("profileStatus")?.toString(),
    kycStatus: searchParams.get("kycStatus")?.toString(),
    emailId: searchParams.get("email")?.toString(),
    mobileNumber: searchParams.get("phone")?.toString(),
    accountId: searchParams.get("accountId")?.toString(),
    accountCreationDate: searchParams.get("createdAt")?.toString(),
    lastUpdateTimestamp: searchParams.get("updatedAt")?.toString(),
  };

  // stats
  const { data: statsData } = useGetSellerStatsQuery();
  const stats = statsData && filterSellerStats(statsData?.data);

  // table
  const {
    data: listData,
    isLoading: listLoad,
    error,
  } = useGetListSellersQuery({ params });
  const list = listData && filterSellersList(listData.data);

  return {
    sellerList: list,
    sellerStats: stats,
    isLoading: listLoad,
    error,
  };
};
