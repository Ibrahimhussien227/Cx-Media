import { campaignApi } from "../api";
import {
  IFeeStructureResponse,
  IFeeStructureRequest,
  IUpdateFeeStructureRequest,
} from "./type";

export const feeStructureApi = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeeStructure: builder.query<IFeeStructureResponse, IFeeStructureRequest>(
      {
        query: ({ campaignId }) => ({
          url: `/fee-structure/campaign/${campaignId}`,
          method: "GET",
        }),
        providesTags: [{ type: "Fee" }],
      }
    ),
    updateFeeStructure: builder.mutation<void, IUpdateFeeStructureRequest>({
      query: ({ feeStructureId, body }) => ({
        url: `/fee-structure/${feeStructureId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Fee" }],
    }),
  }),
});

export const { useGetFeeStructureQuery, useUpdateFeeStructureMutation } =
  feeStructureApi;
