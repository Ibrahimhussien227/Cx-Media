import { campaignApi } from "../api";
import {
  ICampaignApplicationActionRequist,
  ICampaignApplicationActionResponse,
  ICampaignActionResponse,
} from "./type";

export const campaignActionsApi = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    postCampaignApplicationAction: builder.mutation<
      ICampaignApplicationActionResponse,
      ICampaignApplicationActionRequist
    >({
      query: (body) => ({
        url: "/admin/action/application",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Campaign" }],
    }),
    postCampaignAction: builder.mutation<void, ICampaignActionResponse>({
      query: (body) => ({
        url: "/admin/actions",
        method: "POST",
        body,
      }),

      invalidatesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const {
  usePostCampaignApplicationActionMutation,
  usePostCampaignActionMutation,
} = campaignActionsApi;
