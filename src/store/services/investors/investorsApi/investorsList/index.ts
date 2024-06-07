import { investorApi } from "../../api";
import { IGetInvestorListResponse, IGetInvestorStatsResponse } from "./type";

export const getListInvestors = investorApi.injectEndpoints({
  endpoints: (builder) => ({
    getListInvestors: builder.query<
      IGetInvestorListResponse,
      {
        params: {
          page?: string;
        };
      }
    >({
      query: ({ params }) => ({
        url: `/admin/list`,
        method: "GET",
        params,
      }),
    }),
    getInvestorStats: builder.query<IGetInvestorStatsResponse, void>({
      query: () => ({
        url: `/admin/users-count`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetListInvestorsQuery, useGetInvestorStatsQuery } =
  getListInvestors;
