import { tagTypes } from "@/redux/tag-types";
import { IGenericResponse } from "@/types";
import { Buyer } from "@/types/ApiResponse";
import { apiSlice } from "../api/apiSlice";

const BUYER_URL = "/buyers";

const buyerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    buyers: builder.query<IGenericResponse<Buyer[]>, void>({
      query: () => ({
        url: `${BUYER_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.buyer],
    }),
    buyer: builder.query<Buyer, string>({
      query: (id) => ({
        url: `${BUYER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.buyer],
    }),
    buyerUpdate: builder.mutation<
      Buyer,
      { formData: Record<string, any>; id: string }
    >({
      query: ({ formData, id }) => {
        return {
          url: `${BUYER_URL}/${id}`,
          method: "PATCH",
          data: formData,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.buyer],
    }),
  }),
});

export const { useBuyersQuery, useBuyerQuery, useBuyerUpdateMutation } =
  buyerApi;
