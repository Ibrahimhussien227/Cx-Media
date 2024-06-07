import { investorApi } from "../../api";
import { IPatchInvestorStatusRequest } from "./type";

export const ApplicationAction = investorApi.injectEndpoints({
  endpoints: (builder) => ({
    patchInvAppStatus: builder.mutation<void, IPatchInvestorStatusRequest>({
      query: (body) => ({
        url: `/admin/update-application`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["InvestorDetails", "AppList", "stats"],
    }),
  }),
});

export const { usePatchInvAppStatusMutation } = ApplicationAction;
