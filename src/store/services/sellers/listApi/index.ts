import { sellerApi } from "../api";
import {
  IGetSellerApplicationStatsResponse,
  IGetSellersListResponse,
} from "./type";

export const getListSellers = sellerApi.injectEndpoints({
  endpoints: (builder) => ({
    getListSellers: builder.query<
      IGetSellersListResponse,
      {
        params: {
          page?: string;
        };
      }
    >({
      query: ({ params }) => ({
        url: `/admin/seller/list`,
        method: "GET",
        params,
        providesTags: [{ type: "list" }],
      }),
    }),

    getSellerStats: builder.query<IGetSellerApplicationStatsResponse, void>({
      query: () => ({
        url: `/admin/seller/stats`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetListSellersQuery, useGetSellerStatsQuery } =
  getListSellers;
