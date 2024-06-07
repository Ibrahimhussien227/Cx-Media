import { CampaignReviewStatus } from "@/types/enum.constants";
import { campaignApi } from "../api";



export const campaignDetailsApi = campaignApi.injectEndpoints({
  endpoints: (builder) => ({

    getCampaigns: builder.query<IListQueryResp<ICampaignDetails>, ICampaignListQueryParams>({
      query: (params) => ({
        url: 'campaign/list',
        params: params
      }),
      keepUnusedDataFor: 300,
      providesTags: [{type: 'Campaign', id: 'List'}],
    }),
    getCampaignById: builder.query<{data:ICampaignDetails}, string>({
      query: (id) => `campaign/${id}`,
      keepUnusedDataFor: 120,
      providesTags: (result) => [{ type: 'Campaign', id: result?.data.campaignId }],
    }),
    createCampaign: builder.mutation<{data: ICampaignDetails}, {assetName:string}>({
      query: (reqObj)=> ({
        url: 'campaign',
        method: "POST",
        body: reqObj
      }),
      invalidatesTags: [{type: 'Campaign', id: 'List'}]
    }),
     submitCampaignForReview: builder.mutation<void, string>({
      query: (campaignId)=> ({
        url: `campaign/submit/${campaignId}`,
        method: 'POST',
      }),
      async onQueryStarted(campaignId, {dispatch, queryFulfilled}){
        try {
          await queryFulfilled; // pessimistic update
          dispatch(
            campaignDetailsApi.util.updateQueryData('getCampaignById', campaignId, (draft)=> {
              draft.data.reviewStatus = CampaignReviewStatus.PENDING_REVIEW;
              draft.data.updatedAt = new Date().toISOString();
            })
          )
        } catch{}
      }
    }),
    publishCampaign: builder.mutation<{data: boolean}, {campaignId: string; publishingTimestamp: string}>({
      query: ({campaignId, publishingTimestamp})=> ({
        url: 'campaign/publish',
        method: 'PATCH',
        body: {
          campaignId,
          campaignPublishingTimestamp: publishingTimestamp
        }
      }),
      invalidatesTags: (res, _err, args)=> res?.data === true? [
        {type: 'Campaign', id: 'List'},
        { type: 'Campaign', id: args.campaignId }
      ]:[]
    })
  }),
  overrideExisting: false,

});


export const {
  useGetCampaignsQuery,
  useLazyGetCampaignsQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useSubmitCampaignForReviewMutation,
  usePublishCampaignMutation
} = campaignDetailsApi;