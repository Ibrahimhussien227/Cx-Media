import { useGetConfigListQuery } from "@/store/services/campaigns/configListApi";
import { getPropTypeOps } from "./utils";

export const useGetConfig = (configType: string) => {
  // get => amenities
  const { data, isLoading, error } = useGetConfigListQuery({
    configType,
  });

  const configData = data?.data && getPropTypeOps(data.data);

  // filtering amenities

  return {
    configData,
    isLoading,
    error,
  };
};
