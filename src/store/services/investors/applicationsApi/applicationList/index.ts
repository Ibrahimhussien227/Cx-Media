import { investorApi } from "../../api";
import {
  IGetInvestorApplicationListResponse,
  IGetInvestorApplicationStatsResponse,
} from "./type";

export const ApplicationList = investorApi.injectEndpoints({
  endpoints: (builder) => ({
    getInvAppsList: builder.query<
      IGetInvestorApplicationListResponse,
      {
        params: {
          page?: string;
        };
      }
    >({
      query: ({ params }) => ({
        url: `/admin/application-list`,
        method: "GET",
        params,
      }),
      providesTags: [{ type: "AppList" }],
    }),

    getInvestorAppsStats: builder.query<
      IGetInvestorApplicationStatsResponse,
      void
    >({
      query: () => ({
        url: `/admin/application-count`,
        method: "GET",
      }),
      providesTags: [{ type: "stats" }],
    }),
  }),
});

export const { useLazyGetInvAppsListQuery, useGetInvestorAppsStatsQuery } =
  ApplicationList;
