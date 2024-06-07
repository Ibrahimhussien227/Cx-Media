import { sellerApi } from "../api";
import {
  IGetSellerAppLicationListResponse,
  IGetSellerStatsResponse,
  IPatchSellerStatusRequest,
} from "./type";

export const getSellerAppsList = sellerApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerAppsList: builder.query<
      IGetSellerAppLicationListResponse,
      {
        params: {
          page?: string;
        };
      }
    >({
      query: ({ params }) => ({
        url: `/admin/seller/application/list`,
        method: "GET",
        params,
      }),
    }),

    getSellerAppsStats: builder.query<IGetSellerStatsResponse, void>({
      query: () => ({
        url: `/admin/seller/application/stats`,
        method: "GET",
      }),
    }),

    patchSellerAppAction: builder.mutation<void, IPatchSellerStatusRequest>({
      query: (body) => ({
        url: `/profile/application-review-status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["details", "stats"],
    }),
  }),
});

export const {
  useLazyGetSellerAppsListQuery,
  usePatchSellerAppActionMutation,
  useGetSellerAppsStatsQuery,
} = getSellerAppsList;
