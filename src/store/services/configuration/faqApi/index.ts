
import { configurationApi } from "../api";

export const faqApi = configurationApi.injectEndpoints({

  endpoints: (builder) => ({

    getFaq: builder.query<IListQueryResp<IFaq>, void>({
      query: () => ({
        url: 'faq'       
      }),
      keepUnusedDataFor: 1200,     
      providesTags: [{type: 'Config', id: 'faq'}],
    }),
   
}),
  overrideExisting: false,

});

export const {
  useGetFaqQuery 
} = faqApi;