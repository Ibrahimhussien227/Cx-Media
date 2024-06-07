// import { filterCampaing } from "./utils";
import { useGetinvestorByIdQuery } from "@/store/services/investors/investorDetailsApi";
import { filterInvestorDetails } from "./utils";
// import { filterCampainDetails } from "./utils";

const useGetInvestorDetails = (id: string) => {
  // get investor details from API
  const {
    data,
    error,
    isLoading: isLoadingCampaing,
  } = useGetinvestorByIdQuery(id); // Pass the investor id

  const investorDetails = data?.result && filterInvestorDetails(data.result);

  return {
    investorDetails,
    isLoadingCampaing,
    error,
  };
};

export default useGetInvestorDetails;
