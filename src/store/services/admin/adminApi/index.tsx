import { userApi } from "../api";
import {
  IAdminInsightsResponse,
  IAllAdminResponse,
  ICreateAdminRequest,
  IUpdateAdminByIdRequest,
  IGetAdminByIdRequest,
  IGetAdminByIdResponse,
} from "./type";

export const getListAdmins = userApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAdmin: builder.query<IAllAdminResponse, void>({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: [{ type: "Admin" }],
    }),
    createAdmin: builder.mutation<void, ICreateAdminRequest>({
      query: (body) => ({
        url: "/admin",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Admin" }],
    }),
    getAdminById: builder.query<IGetAdminByIdResponse, IGetAdminByIdRequest>({
      query: ({ id }) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
    }),

    getAdminInsights: builder.query<IAdminInsightsResponse, void>({
      query: () => ({
        url: `/admin/insights`,
        method: "GET",
      }),
    }),
    getAdminMe: builder.query<IGetAdminByIdResponse, void>({
      query: () => ({
        url: "/admin/me",
        method: "GET",
      }),
    }),
    updateAdminById: builder.mutation<void, IUpdateAdminByIdRequest>({
      query: ({ id, body }) => ({
        url: `/admin/${id}`,
        method: "PATCH",
        body,
      }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        await queryFulfilled; // pessimistic update
        dispatch(
          getListAdmins.util.updateQueryData(
            "getAdminById",
            { id },
            (draft) => {
              const cachedAssetDetails = draft.data.profile;
              Object.assign(cachedAssetDetails, body);
            },
          ),
        );
        dispatch(
          getListAdmins.util.updateQueryData(
            "getAdminById",
            { id },
            (draft) => {
              const cachedAssetDetails = draft.data;
              Object.assign(cachedAssetDetails, body);
            },
          ),
        );
        dispatch(
          getListAdmins.util.updateQueryData(
            "getAdminMe",
            undefined,
            (draft) => {
              const cachedAssetDetails = draft.data.profile;
              Object.assign(cachedAssetDetails, body);
            },
          ),
        );
        dispatch(
          getListAdmins.util.updateQueryData(
            "getAdminMe",
            undefined,
            (draft) => {
              const cachedAssetDetails = draft.data;
              Object.assign(cachedAssetDetails, body);
            },
          ),
        );
      },
    }),
  }),
});

export const {
  useGetAllAdminQuery,
  useUpdateAdminByIdMutation,
  useGetAdminInsightsQuery,
  useCreateAdminMutation,
  useGetAdminByIdQuery,
  useGetAdminMeQuery,
} = getListAdmins;
