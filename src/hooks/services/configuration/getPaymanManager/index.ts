// import { filterCampaing } from "./utils";
import { useGetPaymentManagerQuery } from "@/store/services/configuration/paymentApi";
import { filterCampaignManager } from "./utils";

const useGetPaymentManager = () => {
  // get campaigns from API
  const {
    data,
    error,
    isLoading: isLoadingManagerData,
  } = useGetPaymentManagerQuery(); // Pass the id property instead of the entire object

  const managerData = data?.result && filterCampaignManager(data.result);

  return {
    managerData,
    isLoadingManagerData,
    error,
  };
};

export default useGetPaymentManager;
