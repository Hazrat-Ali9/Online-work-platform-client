import { Task } from "@/types/ApiResponse";
import { createSlice } from "@reduxjs/toolkit";

interface TaskState {
  task: Partial<Task>;
}

const initialState: TaskState = {
  task: {},
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
  },
});

export const { setTask } = taskSlice.actions;
export default taskSlice.reducer;
