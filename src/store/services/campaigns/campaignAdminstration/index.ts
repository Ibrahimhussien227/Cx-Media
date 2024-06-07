import { campaignApi } from "../api";
import { IGetCampaignAdminResponse, IGetCampaignRequistParams } from "./type";

export const getCampaignAdminstration = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignAdminstration: builder.query<
      IGetCampaignAdminResponse,
      IGetCampaignRequistParams
    >({
      query: (params) => ({
        url: "/admin/administration",
        method: "GET",
        params,
      }),
      providesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const { useGetCampaignAdminstrationQuery } = getCampaignAdminstration;
