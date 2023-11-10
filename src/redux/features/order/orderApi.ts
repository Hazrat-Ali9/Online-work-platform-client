import { IGenericResponse } from "@/types";
import { Order, OrderItem } from "@/types/ApiResponse";
import { apiSlice } from "../api/apiSlice";
import { tagTypes } from "@/redux/tag-types";

const ORDER_URL = "/orders";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query<Order[], void>({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    addOrder: builder.mutation<
      Order,
      {
        orderItem: {
          taskId?: string;
          sellerId?: string;
          quantity: number;
          price?: string;
        }[];
      }
    >({
      query: (data) => ({
        url: `${ORDER_URL}/create-order`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    removeOrder: builder.mutation<Order, string>({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.order],
    }),
    updateOrder: builder.mutation<Order, Partial<Order>>({
      query: (data) => ({
        url: `${ORDER_URL}/${data.id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useOrdersQuery,
  useUpdateOrderMutation,
  useRemoveOrderMutation,
} = orderApi;
