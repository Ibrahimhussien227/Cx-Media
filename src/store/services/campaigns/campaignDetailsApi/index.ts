import { campaignApi } from "../api";
import { IGetCampaignResponse } from "./type";

export const campaignDetailsApi = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignById: builder.query<IGetCampaignResponse, string>({
      query: (id) => ({
        url: `/campaign/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 120,
      providesTags: [{ type: "Campaign" }],
    }),
  }),
});

export const { useGetCampaignByIdQuery } = campaignDetailsApi;
