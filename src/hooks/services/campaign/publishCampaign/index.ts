import { useGetCampaignEndDateQuery } from "@/store/services/campaigns/campaignEndDateApi";
import { usePatchPublishCampaignMutation } from "@/store/services/campaigns/publishCampaignApi";

const usePublishCaqmpaign = (publishDate: string) => {
  // get campaign end date

  const { data: campEndDate } = useGetCampaignEndDateQuery({
    campaignPublishingTimestamp: new Date(publishDate)
      .toISOString()
      .split("T")[0],
  });

  // publish a campaign date
  const [patchPublishCampaign, { isLoading }] =
    usePatchPublishCampaignMutation();

  return {
    campEndDate,
    patchPublishCampaign,
    isLoading,
  };
};

export default usePublishCaqmpaign;
