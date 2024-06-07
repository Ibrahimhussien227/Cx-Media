import { IGetCampaignStatsResponse } from "./type";
import { adminApi } from "../api";

export const getCampStats = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaignStats: builder.query<IGetCampaignStatsResponse, void>({
      query: () => ({
        url: "/status-count",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCampaignStatsQuery, useLazyGetCampaignStatsQuery } =
  getCampStats;
