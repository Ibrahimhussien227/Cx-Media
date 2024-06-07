
import { createApi } from '@reduxjs/toolkit/query/react';
import { genControlledBaseQuery } from '../genControlledBaseQuery';

export const configurationApi = createApi({
  reducerPath: 'configurationApi',
  baseQuery: genControlledBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_CONFIGURATION_SERVICE_URL,
  }),
  tagTypes: ["Config"],  
  endpoints: () => ({}),
});