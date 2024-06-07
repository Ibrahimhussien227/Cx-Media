import { adminApi } from "../api";
import { IGetApplicationStatsResponse } from "./type";

export const getAppStats = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplicationStats: builder.query<IGetApplicationStatsResponse, void>({
      query: () => ({
        url: "/application/count",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetApplicationStatsQuery, useLazyGetApplicationStatsQuery } =
  getAppStats;
