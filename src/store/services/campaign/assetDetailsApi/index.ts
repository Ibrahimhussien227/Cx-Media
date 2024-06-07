

import { campaignApi } from "../api";
import { campaignDetailsApi } from "../campaignDetailsApi";



export const assetDetailsApi = campaignApi.injectEndpoints({

  endpoints: (builder) => ({

    updateAssetGeneralData: builder.mutation<void, {campaignId: string, assetId: string, params: IAssetDetails}>({
      query: ({assetId, params})=> ({
        url: `asset/${assetId}`,
        method: "PATCH",
        body: params
      }),
      invalidatesTags: ()=> [
        {type: 'Campaign', id: 'List'}, // invalidating the list cache as changes here is seen on the table
      ],
      async onQueryStarted({campaignId, params}, {dispatch, queryFulfilled}){
        try {
          await queryFulfilled; // pessimistic update
          dispatch(
            campaignDetailsApi.util.updateQueryData('getCampaignById', campaignId, (draft)=> {
              const cachedAssetDetails = draft.data.assetDetails as IAssetDetails;
              Object.assign(cachedAssetDetails, params)
            })
          )
        } catch{}
      }
    }),

    addAssetLocation: builder.mutation<{data: IAssetLocation}, {campaignId: string, params: IAssetLocation}>({
      query: ({params})=> ({
        url: 'asset/location',
        method: "POST",
        body: params
      }),
      async onQueryStarted({campaignId}, {dispatch, queryFulfilled}){
        try {
          const {data} = await queryFulfilled; // pessimistic update
          dispatch(
            campaignDetailsApi.util.updateQueryData('getCampaignById', campaignId, (draft)=> {
              const cachedAssetDetails = draft.data.assetDetails as IAssetDetails;
              cachedAssetDetails.assetLocation = data.data;
            })
          )
        } catch{}
      }
    }),

    updateAssetLocation: builder.mutation<void, {assetLocationId: string, campaignId: string, params: Partial<IAssetLocation>}>({
      query: ({assetLocationId, params})=> ({
        url: `asset/location/${assetLocationId}`,
        method: "PATCH",
        body: params
      }),
      async onQueryStarted({campaignId, params: locationParams}, {dispatch, queryFulfilled}){
        try {
         await queryFulfilled; // pessimistic update
          dispatch(
            campaignDetailsApi.util.updateQueryData('getCampaignById', campaignId, (draft)=> {
              const cachedAssetLocation = draft.data.assetDetails?.assetLocation as IAssetLocation;
              Object.assign(cachedAssetLocation, locationParams) 
            })
          )
        } catch {}
      }
    }),

    addAssetAmenities: builder.mutation<IGenericResponse, {campaignId: string, assetId:string, amenitiesNames: string[]}>({
      query: (amenitesReqBody)=> ({
        url: 'asset/amenity',
        method: "POST",
        body: amenitesReqBody
      }),
      invalidatesTags: (res, _err, arg)=> res?.message === 'success'? [
        {type: 'Campaign', id: arg.campaignId} 
      ]: [],
    }),

  }),
  overrideExisting: false,

});


export const {
  useUpdateAssetGeneralDataMutation,
  useAddAssetAmenitiesMutation,
  useAddAssetLocationMutation,
  useUpdateAssetLocationMutation
} = assetDetailsApi;