import { campaignApi } from "../api";
import { campaignDetailsApi } from "../campaignDetailsApi";
import {
  IAssetAminityRequest,
  IAssetDetailsRequest,
  IAssetDocumentRequest,
  IAssetUpdateFinancialRequest,
  IAssetLocationRequest,
  IAssetMediaRequest,
  IAssetCreateFinancialRequest,
} from "./type";

export const assetDetailsApi = campaignApi.injectEndpoints({
  endpoints: (builder) => ({
    updateAssetGeneralData: builder.mutation<void, IAssetDetailsRequest>({
      query: ({ body, assetId }) => ({
        url: `/asset/${assetId}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ campaignId, body }, { dispatch, queryFulfilled }) {
        await queryFulfilled; // pessimistic update
        dispatch(
          campaignDetailsApi.util.updateQueryData(
            "getCampaignById",
            campaignId,
            (draft) => {
              const cachedAssetDetails = draft.data.assetDetails;
              Object.assign(cachedAssetDetails, body);
            }
          )
        );
      },
    }),

    updateAssetLocation: builder.mutation<void, IAssetLocationRequest>({
      query: ({ assetLocationId, body }) => ({
        url: `asset/location/${assetLocationId}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ campaignId, body }, { dispatch, queryFulfilled }) {
        await queryFulfilled; // pessimistic update
        dispatch(
          campaignDetailsApi.util.updateQueryData(
            "getCampaignById",
            campaignId,
            (draft) => {
              const cachedAssetLocation =
                draft.data.assetDetails?.assetLocation;
              Object.assign(cachedAssetLocation, body);
            }
          )
        );
      },
    }),
    updateAssetFinance: builder.mutation<void, IAssetUpdateFinancialRequest>({
      query: ({ body, financialId }) => ({
        url: `/asset/finance/${financialId}`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ campaignId, body }, { dispatch, queryFulfilled }) {
        await queryFulfilled; // pessimistic update
        dispatch(
          campaignDetailsApi.util.updateQueryData(
            "getCampaignById",
            campaignId,
            (draft) => {
              const cachedAssetFinancial = draft.data.financialDetails;
              Object.assign(cachedAssetFinancial, body);
            }
          )
        );
      },
    }),
    createAssetFinance: builder.mutation<void, IAssetCreateFinancialRequest>({
      query: ({ body }) => ({
        url: "/asset/finance",
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted({ campaignId, body }, { dispatch, queryFulfilled }) {
        await queryFulfilled; // pessimistic update
        dispatch(
          campaignDetailsApi.util.updateQueryData(
            "getCampaignById",
            campaignId,
            (draft) => {
              const cachedAssetFinancial = draft.data.financialDetails;
              Object.assign(cachedAssetFinancial, body);
            }
          )
        );
      },
    }),
    UpdateAssetDocument: builder.mutation<void, IAssetDocumentRequest>({
      query: ({ body }) => ({
        url: `/asset/media/documents`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Campaign" }],
    }),
    updateAssetAmenity: builder.mutation<void, IAssetAminityRequest>({
      query: (body) => ({
        url: `/asset/amenity`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Campaign" }],
    }),
    updatePhotos: builder.mutation<void, IAssetMediaRequest>({
      query: ({ body }) => ({
        url: "/asset/media/images",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Campaign" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateAssetFinanceMutation,
  useUpdateAssetAmenityMutation,
  useUpdateAssetGeneralDataMutation,
  useUpdateAssetLocationMutation,
  useUpdateAssetFinanceMutation,
  useUpdateAssetDocumentMutation,
  useUpdatePhotosMutation,
} = assetDetailsApi;
