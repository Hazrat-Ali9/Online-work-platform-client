import { ILoginUserResponse, User } from "@/types/ApiResponse";
import { apiSlice } from "../api/apiSlice";
import { tagTypes } from "@/redux/tag-types";

const AUTH_URL = "/auth";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: credentials,
      }),
    }),
    registerSeller: builder.mutation<ILoginUserResponse, FormData>({
      query: (credentials) => ({
        url: `/users/seller/register`,
        method: "POST",
        data: credentials,
        contentType: "multipart/form-data",
      }),
    }),
    registerBuyer: builder.mutation<ILoginUserResponse, FormData>({
      query: (credentials) => ({
        url: `/users/buyer/register`,
        method: "POST",
        data: credentials,
        contentType: "multipart/form-data",
      }),
    }),
    registerAdmin: builder.mutation<ILoginUserResponse, FormData>({
      query: (credentials) => ({
        url: `/users/admin/register`,
        method: "POST",
        data: credentials,
        contentType: "multipart/form-data",
      }),
      invalidatesTags:[tagTypes.admin]
    }),
    deleteUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.seller, tagTypes.buyer, tagTypes.seller, tagTypes.admin],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterSellerMutation,
  useRegisterBuyerMutation,
  useRegisterAdminMutation,
  useDeleteUserMutation,
} = authApi;
