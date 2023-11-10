import { tagTypes } from "@/redux/tag-types";
import { IGenericResponse } from "@/types";
import { Admin } from "@/types/ApiResponse";
import { apiSlice } from "../api/apiSlice";

const ADMIN_URL = "/admins";

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    admins: builder.query<IGenericResponse<Admin[]>, void>({
      query: () => ({
        url: `${ADMIN_URL}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    admin: builder.query<Admin, string>({
      query: (id) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    adminUpdate: builder.mutation<
      Admin,
      { formData: Record<string,any>; id: string }
    >({
      query: ({ formData, id }) => {
        return {
          url: `${ADMIN_URL}/${id}`,
          method: "PATCH",
          data: formData,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const { useAdminsQuery, useAdminQuery, useAdminUpdateMutation } =
  adminApi;
