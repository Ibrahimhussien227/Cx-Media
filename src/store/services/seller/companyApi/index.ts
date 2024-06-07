
import { sellerApi } from "../api";

export const SellerCompanyApi = sellerApi.injectEndpoints({

  endpoints: (builder) => ({

    getSellerCompanyDetails: builder.query<{data: ICompanyDetails}, string>({
      query: (sellerId) => `company/${sellerId}`,
      keepUnusedDataFor: 300,
      providesTags: [{type: 'Profile'}]
    }),
    createSellerCompany: builder.mutation<IGenericResponse, FormData>({
      query: (data)=> ({
        url: 'company',
        method: "POST",
        body: data
      }),
      invalidatesTags: (res)=> res?.message === 'success'? [{type: 'Profile'}] : []
    }),
    updateSellerCompany: builder.mutation<IGenericResponse, FormData>({
      query: (data)=> ({
        url: 'company',
        method: "PATCH",
        body: data
      }),
      invalidatesTags:(res)=> res?.message === 'success'? [{type: 'Profile'}] : []
    }),
    
  }),
  overrideExisting: false,

});

export const {
  useGetSellerCompanyDetailsQuery,
  useCreateSellerCompanyMutation,
  useUpdateSellerCompanyMutation
} = SellerCompanyApi;