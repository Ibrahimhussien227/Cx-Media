import { sellerApi } from "../api";
import { IPatchSellerDetailsRequest, ISellerDetailsResponse } from "./type";

export const sellerDetailsApi = sellerApi.injectEndpoints({
  endpoints: (builder) => ({
    getSellerDetails: builder.query<
      ISellerDetailsResponse,
      { sellerId: string }
    >({
      query: (params) => ({
        url: `/admin/seller/${params.sellerId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 120,
      providesTags: [{ type: "details" }],
    }),

    patchSellerCompDetails: builder.mutation<void, IPatchSellerDetailsRequest>({
      query: (body) => ({
        url: `/company/admin-company-update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["details"],
    }),

    patchSellerRepDetails: builder.mutation<void, IPatchSellerDetailsRequest>({
      query: (body) => ({
        url: `/company/admin-companyRep-update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["details"],
    }),
  }),
});

export const {
  useGetSellerDetailsQuery,
  usePatchSellerCompDetailsMutation,
  usePatchSellerRepDetailsMutation,
} = sellerDetailsApi;
