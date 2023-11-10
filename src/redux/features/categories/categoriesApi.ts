import { Category } from "@/types/ApiResponse";
import { apiSlice } from "../api/apiSlice";
import { IGenericResponse } from "@/types";
import { tagTypes } from "@/redux/tag-types";

const CATEGORIES_URL = "/categories";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    categories: builder.query<IGenericResponse<Category[]>, void>({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    category: builder.query<Category, string>({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    addCategory: builder.mutation<IGenericResponse<Category>, Category>({
      query: (data) => ({
        url: `${CATEGORIES_URL}/create-category`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    updateCategory: builder.mutation<
      Category,
      { id: string; data: Partial<Category> }
    >({
      query: ({ id, data }) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    deleteCategory: builder.mutation<Category, string >({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useCategoriesQuery,
  useCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
