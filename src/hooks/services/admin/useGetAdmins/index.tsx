import {
  useGetAdminInsightsQuery,
  useGetAllAdminQuery,
} from "@/store/services/admin/adminApi";
import { filterStates } from "./utils";

export const useGetAdmins = () => {
  // get => amenities
  const {
    data: allAdmin,
    isLoading: isLoadingAdmins,
    error,
  } = useGetAllAdminQuery();
  const { data: adminStats, isLoading: isLoadingStats } =
    useGetAdminInsightsQuery(undefined, {
      selectFromResult: ({ data, error, isLoading }) => ({
        data: filterStates(data?.data) || [],
        error,
        isLoading,
      }),
    });

  // filtering amenities

  return {
    allAdmin,
    adminStats,
    isLoading: isLoadingAdmins || isLoadingStats,
    isLoadingStats,
    error,
  };
};
