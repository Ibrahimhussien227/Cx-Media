import { configurationApi } from "../api";
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

export const contactApi = configurationApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query<{ result: { [key: string]: string } }, void>({
      query: () => ({
        url: 'configuration/ui',
        params: { clientId, 'api-key': 'XXX-XXX' }, 
        
      }),
      keepUnusedDataFor: 1200,
      providesTags: [{ type: 'Config', id: 'support' }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetContactQuery } = contactApi;
