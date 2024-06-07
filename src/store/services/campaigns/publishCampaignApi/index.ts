import { campaignApi } from "../api";
import { IpublishCampaignRequist, IpublishCampaignResponse } from "./type";

export const publishCampaignApi = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    patchPublishCampaign: builder.mutation<
      IpublishCampaignResponse,
      IpublishCampaignRequist
    >({
      query: (body) => ({
        url: "/campaign/publish",
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const { usePatchPublishCampaignMutation } = publishCampaignApi;
