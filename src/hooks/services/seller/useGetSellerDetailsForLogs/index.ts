import { useGetSellerDetailsQuery } from "@/store/services/sellers/sellerDetailsApi";

const useGetSellerDetailsForLogs = (sellerId: string) => {
  // get AdminstrationLogs from API
  const {
    data,
    error,
    isLoading: isLoadingSellerDetails,
  } = useGetSellerDetailsQuery(
    {
      sellerId,
    },
    {
      selectFromResult: ({ data, error, isLoading }) => ({
        data: {
          sellerId: data?.data.sellerId,
          sellerName: data?.data.sellerName,
          sellerType: data?.data.sellerType,
          email: data?.data.userDetails.emailId,
        },
        error,
        isLoading,
      }),
    }
  );

  return {
    sellerDetails: data,
    isLoadingSellerDetails,
    error,
  };
};

export default useGetSellerDetailsForLogs;
