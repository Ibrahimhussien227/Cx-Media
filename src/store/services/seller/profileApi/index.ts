
import { RootState } from "@/store/store";
import { sellerApi } from "../api";
import { setUser } from "@/store/slices/user/userSlice";
import { ApplicationReviewStatus, SellerTypeEnum } from "@/types/enum.constants";

export const SellerProfileApi = sellerApi.injectEndpoints({

  endpoints: (builder) => ({

    getSellerProfile: builder.query<{data: ISellerProfile}, void>({
      query: () => `profile`,
      keepUnusedDataFor: 600,
      providesTags:  [{type: 'Profile'}],
      async onQueryStarted(_arg, {dispatch, queryFulfilled, getState}){
        // pessimistic updates for user profile 
        const state = getState() as RootState;
        const user = state.user.value;
        try {
          const {data} = await queryFulfilled; // pessimistic update
          dispatch(
            setUser(data.data)
          )
        } catch{}
      }
    }),
    updateSellerProfile: builder.mutation<{result: boolean}, {sellerType: SellerTypeEnum, sellerId: string}>({
      query: (data)=> ({
        url: 'profile',
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (resp) => resp?.result ? [{type: 'Profile'}] : []
    }),
    submitProfileForReview: builder.mutation<{data: boolean}, string>({
      query: ()=> ({
        url: 'profile/submit-application',
        method: "PATCH",
      }),
      async onQueryStarted(_sellerId, {queryFulfilled, dispatch}){
        try {
          const {data} = await queryFulfilled;
          if (data.data){
            dispatch(
              SellerProfileApi.util.updateQueryData('getSellerProfile', undefined, (draft)=> {
                draft.data.applicationReviewStatus = ApplicationReviewStatus.PENDING_REVIEW
              })
            )
          }
        } catch{}
      }
    })
    
  }),
  overrideExisting: false,

});

export const {
  useGetSellerProfileQuery,
  useLazyGetSellerProfileQuery,
  useUpdateSellerProfileMutation,
  useSubmitProfileForReviewMutation
} = SellerProfileApi;