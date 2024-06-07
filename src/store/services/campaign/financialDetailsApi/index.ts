

import { campaignApi } from "../api";
import { campaignDetailsApi } from "../campaignDetailsApi";



export const financialDetailsApi = campaignApi.injectEndpoints({

  endpoints: (builder) => ({
    
    createFinancialDetails: builder.mutation<{data: IFinancialDetails}, {campaignDetails: ICampaignDetails, details: IFinancialDetails}>({
      query: ({details, campaignDetails})=> ({
        url: 'asset/finance',
        method: "POST",
        body: {assetId: campaignDetails.assetId, ...details}
      }),
      async onQueryStarted({campaignDetails}, {dispatch, queryFulfilled}){
        try {
          const {data} = await queryFulfilled; // pessimistic update
          dispatch(
            campaignDetailsApi.util.updateQueryData('getCampaignById', campaignDetails.campaignId, (draft)=> {
              draft.data.financialDetails = data.data;
              draft.data.financialId = data.data.financialId;
            })
          )
        } catch{}
      }
    }),
    updateFinancialDetails: builder.mutation<void, {campaignId: string, details: IFinancialDetails}>({
      query: ({details})=> ({
        url: `asset/finance/${details.financialId}`,
        method: "PATCH",
        body: details
      }),
      async onQueryStarted({campaignId, details}, {dispatch, queryFulfilled}){
        try {
          await queryFulfilled; // pessimistic update
          dispatch(
            campaignDetailsApi.util.updateQueryData('getCampaignById', campaignId, (draft)=> {
              const cachedFinancials = draft.data.financialDetails as IFinancialDetails;
              Object.assign(cachedFinancials, details)
            })
          )
        } catch{}
      }
    })
  }),
  overrideExisting: false,

});


export const {
  useCreateFinancialDetailsMutation,
  useUpdateFinancialDetailsMutation
} = financialDetailsApi;