// import { filterCampaing } from "./utils";
import { useGetSellerDetailsQuery } from "@/store/services/sellers/sellerDetailsApi";
import { filterSellerDetails } from "./utils";
// import { filterCampainDetails } from "./utils";

const useGetSellerDetails = (id: string) => {
  // get seller details from API
  const { data, error, isLoading } = useGetSellerDetailsQuery({ sellerId: id }); // Pass the investor id

  const sellerDetails = data?.data && filterSellerDetails(data.data);

  return {
    sellerDetails,
    isLoading,
    error,
  };
};

export default useGetSellerDetails;
