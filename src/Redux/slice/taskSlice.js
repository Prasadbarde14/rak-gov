import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "ActionPlan",
  initialState: {
    inProgress: [],
    ispending: [],
    completed: [],
  },
  reducers: {
    addToPending: (state, action) => {
      state.ispending.push(action.payload);
    },
    addToProgress: (state, action) => {
      state.inProgress.push(action.payload);
    },
    completed: (state, action) => {
      state.completed.push(action.payload);
    },
  },
});

export const { addToPending, addToProgress, completed } = taskSlice.actions;

export default taskSlice.reducer;
