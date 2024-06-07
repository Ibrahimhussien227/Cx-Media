

import { campaignApi } from "../api";



export const assetMediaApi = campaignApi.injectEndpoints({

  endpoints: (builder) => ({
    
    addAssetPhotos: builder.mutation<IGenericResponse, {campaignId: string, params: FormData}>({
      query: ({params})=> ({
        url: 'asset/media/images',
        method: "POST",
        body: params
      }),
      invalidatesTags: (res, _err, arg)=> res?.message === 'success'? [
        {type: 'Campaign', id: arg.campaignId},
        {type: 'Campaign', id: 'List'},//since the thumbnail is shown
      ] : [],
    }),
    addAssetDocs: builder.mutation<IGenericResponse, {campaignId: string, params: FormData}>({
      query: ({params})=> ({
        url: 'asset/media/documents',
        method: "POST",
        body: params
      }),
      invalidatesTags: (res, _err, arg)=> res?.message === 'success'? [
        {type: 'Campaign', id: arg.campaignId} 
      ] : [],
    }),
  }),
  overrideExisting: false,

});

export const {
  useAddAssetDocsMutation,
  useAddAssetPhotosMutation
} = assetMediaApi