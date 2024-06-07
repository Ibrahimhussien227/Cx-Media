import { investorApi } from "../../api";
import { IPatchInvestorActionRequest } from "./type";

export const investorActions = investorApi.injectEndpoints({
  endpoints: (builder) => ({
    patchInvestorStatus: builder.mutation<void, IPatchInvestorActionRequest>({
      query: (body) => ({
        url: `/admin/update-status`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["InvestorDetails"],
    }),
  }),
});

export const { usePatchInvestorStatusMutation } = investorActions;
