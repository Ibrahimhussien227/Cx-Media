// import { filterCampaing } from "./utils";
import { useGetCampaignByIdQuery } from "@/store/services/campaigns/campaignDetailsApi";
import { filterCampainDetails } from "./utils";

const useGetCampaignDetails = (id: string) => {
  // get campaigns from API
  const {
    data: campaignDetails,
    error,
    isLoading: isLoadingCampain,
  } = useGetCampaignByIdQuery(id, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data: data?.data && filterCampainDetails(data.data),
      error,
      isLoading,
    }),
  }); // Pass the id property instead of the entire object

  // const campaignDetails = data?.data && filterCampainDetails(data.data);

  return {
    campaignDetails,
    isLoadingCampain,
    error,
  };
};

export default useGetCampaignDetails;
