import { investorApi } from "../api";
import { IInvestorDetailsData, IUpadeInvestorRequest } from "./type";

export const investorDetailsApi = investorApi.injectEndpoints({
  endpoints: (builder) => ({
    getinvestorById: builder.query<IInvestorDetailsData, string>({
      query: (id) => ({
        url: `/admin/investor/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 120,
      providesTags: [{ type: "InvestorDetails" }],
    }),

    updateInvestor: builder.mutation<void, IUpadeInvestorRequest>({
      query: ({ body }) => ({
        url: `/admin/update-investor`,
        method: "PATCH",
        body,
      }),
      //   keepUnusedDataFor: 120,
      invalidatesTags: [{ type: "InvestorDetails" }],
    }),
  }),
});

export const { useGetinvestorByIdQuery, useUpdateInvestorMutation } =
  investorDetailsApi;
