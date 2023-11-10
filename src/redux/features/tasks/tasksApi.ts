import { tagTypes } from "@/redux/tag-types";
import { apiSlice } from "../api/apiSlice";
import { IGenericResponse } from "@/types";
import { Task } from "@/types/ApiResponse";

const TASK_URL = "/tasks";

const tasksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tasks: builder.query<IGenericResponse<Task[]>, string>({
      query: (query) => ({
        url: `${TASK_URL}/${query}`,
        method: "GET",
      }),
      providesTags: [tagTypes.task],
    }),
    createTask: builder.mutation<Task, FormData>({
      query: (formData) => ({
        url: `${TASK_URL}/create-task`,
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.task],
    }),
    task: builder.query<Task, string>({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.task],
    }),
    taskUpdate: builder.mutation<Task, { formData: FormData; id: string }>({
      query: ({ formData, id }) => {
        return {
          url: `${TASK_URL}/${id}`,
          method: "PATCH",
          data: formData,
          contentType: "multipart/form-data",
        };
      },
      invalidatesTags: [tagTypes.task],
    }),
    taskDelete: builder.mutation<Task, string>({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.task],
    }),
  }),
});

export const {
  useTasksQuery,
  useTaskQuery,
  useTaskUpdateMutation,
  useCreateTaskMutation,
  useTaskDeleteMutation,
} = tasksApi;
