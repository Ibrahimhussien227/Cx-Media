
import { CampaignManagerStatus } from "@/types/enum.constants";
import { sellerApi } from "../api";

export const SellerTeamApi = sellerApi.injectEndpoints({

  endpoints: (builder) => ({

    getCampaignManagers: builder.query<IListQueryResp<ICampaignManager>, void>({
      query: () => ({
        url: 'campaign-manager/list',
      }),
      keepUnusedDataFor: 600,
      providesTags: [{type: 'Team', id: 'List'}],
    }),
    inviteCampaignManager: builder.mutation<{data: ICampaignManager}, {fullName:string, email:string}>({
      query: (reqObj)=> ({
        url: 'campaign-manager',
        method: "POST",
        body: reqObj
      }),
    
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled; // pessimistic update
          dispatch(
            SellerTeamApi.util.updateQueryData('getCampaignManagers', undefined, (draft) => {
            
              draft.data.push(data.data);
            })
          );
        } catch (error) {
          console.error('Error updating cached data for inviteCampaignManager:', error);
         
        }
      }
    }),
    CampaignManagerStatus: builder.mutation<Boolean, {campaignManagerId:string, status:CampaignManagerStatus}>({
      query: (reqObj)=> ({
        url: 'campaign-manager/status',
        method: "PATCH",
        body: reqObj
      }), 
      async onQueryStarted({ campaignManagerId, status }, { dispatch, queryFulfilled }) {
        try {
        
          await queryFulfilled;
          dispatch(SellerTeamApi.util.updateQueryData("getCampaignManagers",undefined, (draft) => {           
            const campaignManagerToUpdate = draft.data.find((res) => res.campaignManagerId === campaignManagerId);
            if (campaignManagerToUpdate) {
              campaignManagerToUpdate.status = status;
            }
          }));
        } catch (error) {
          console.error('Error updating cached data:', error);
        }
      }    
  }),
}),
  overrideExisting: false,

});

export const {
  useGetCampaignManagersQuery,
  useInviteCampaignManagerMutation,
  useCampaignManagerStatusMutation
} = SellerTeamApi;