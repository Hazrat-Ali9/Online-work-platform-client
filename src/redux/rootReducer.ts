import { apiSlice } from "./features/api/apiSlice";
import filterReducer from "./features/filter/filterSlice";
import taskReducer from "./features/tasks/taskSlice";

export const reducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  tasks: taskReducer,
  filter: filterReducer,
};
