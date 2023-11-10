import { tagTypes } from "@/redux/tag-types";
import { apiSlice } from "../api/apiSlice";

const PROFILE_URL = "/profile";

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: `${PROFILE_URL}/me`,
        method: "GET",
      }),
      providesTags: [tagTypes.profile],
    }),
    profileUpdate: builder.mutation({
      query: (data) => ({
        url: `${PROFILE_URL}/me/update`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
});

export const { useProfileQuery, useProfileUpdateMutation } = profileApi;
