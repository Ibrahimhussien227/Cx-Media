import { campaignApi } from "../api";
import {
  IGetCamapignEndDateRequest,
  IGetCamapignEndDateResponse,
} from "./type";

export const getCampaignEndDate = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignEndDate: builder.query<
      IGetCamapignEndDateResponse,
      IGetCamapignEndDateRequest
    >({
      query: (params) => ({
        url: "/campaign/end-date",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetCampaignEndDateQuery } = getCampaignEndDate;
