import { tagTypes } from "@/redux/tag-types";
import { apiSlice } from "../api/apiSlice";
import { IGenericResponse } from "@/types";
import { TaskReview } from "@/types/ApiResponse";

const TASKREVIEW_URL = "/task-reviews";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTaskReview: builder.mutation<TaskReview, any>({
      query: (data) => ({
        url: `${TASKREVIEW_URL}/create-task-review`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.taskReview, tagTypes.task],
    }),
    taskReviews: builder.query<IGenericResponse<TaskReview[]>, string>({
      query: (query) => ({
        url: `${TASKREVIEW_URL}/${query}`,
        method: "GET",
      }),
      providesTags: [tagTypes.taskReview],
    }),
    taskReview: builder.query<TaskReview, string>({
      query: (id) => ({
        url: `${TASKREVIEW_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.taskReview],
    }),
    taskReviewUpdate: builder.mutation<
      TaskReview,
      { formData: Partial<TaskReview>; id: string }
    >({
      query: ({ formData, id }) => {
        return {
          url: `${TASKREVIEW_URL}/${id}`,
          method: "PATCH",
          data: formData,
        };
      },
      invalidatesTags: [tagTypes.taskReview],
    }),
  }),
});

export const {
  useTaskReviewsQuery,
  useTaskReviewQuery,
  useTaskReviewUpdateMutation,
  useAddTaskReviewMutation,
} = tasksApi;
