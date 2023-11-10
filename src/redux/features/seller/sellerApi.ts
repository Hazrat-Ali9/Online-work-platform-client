import { tagTypes } from "@/redux/tag-types";
import { apiSlice } from "../api/apiSlice";
import { Seller } from "@/types/ApiResponse";
import { IGenericResponse } from "@/types";

const SELLER_URL = "/sellers";

const sellerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sellers: builder.query<IGenericResponse<Seller[]>, void>({
      query: () => ({
        url: `${SELLER_URL}/`,
        method: "GET",
      }),
      providesTags: [tagTypes.seller],
    }),
    seller: builder.query<Seller, string>({
      query: (id) => ({
        url: `${SELLER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.seller],
    }),
    sellerUpdate: builder.mutation<
      Seller,
      { formData: Record<string, any>; id: string }
    >({
      query: ({ formData, id }) => {
        return {
          url: `${SELLER_URL}/${id}`,
          method: "PATCH",
          data: formData,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.seller],
    }),
  }),
});

export const { useSellersQuery, useSellerQuery, useSellerUpdateMutation } =
  sellerApi;
