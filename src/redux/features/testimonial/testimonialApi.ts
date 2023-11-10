import { IGenericResponse } from "@/types";
import { Testimonial } from "@/types/ApiResponse";
import { apiSlice } from "../api/apiSlice";
import { tagTypes } from "@/redux/tag-types";

const TESTIMONIAL_URL = "/testimonials";

const testimonialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    testmonials: builder.query<IGenericResponse<Testimonial[]>, void>({
      query: () => ({
        url: `${TESTIMONIAL_URL}`,
        method: "GET",
      }),
      providesTags: [tagTypes.testimonial],
    }),
    testmonial: builder.query<Testimonial, string>({
      query: (id) => ({
        url: `${TESTIMONIAL_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.testimonial],
    }),
    createTestimonial: builder.mutation<Testimonial, Partial<Testimonial>>({
      query: (data) => ({
        url: `${TESTIMONIAL_URL}/create-testimonial`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
    updateTestimonial: builder.mutation<Testimonial, Partial<Testimonial>>({
      query: (data) => ({
        url: `${TESTIMONIAL_URL}/${data.id}`,
        method: "PATCH",
        data: { status: data.status },
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
  }),
});

export const {
  useTestmonialsQuery,
  useUpdateTestimonialMutation,
  useCreateTestimonialMutation,
  useTestmonialQuery,
} = testimonialApi;
