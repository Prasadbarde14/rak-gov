import { createSlice } from "@reduxjs/toolkit";


const bobSlice = createSlice({
    name:"BobSlice",
    initialState:{
        successRate:0,
        executionTime:0,
        errorRate:0,
        avgLatency:0,
        throughPut:0,
        time:"",
        history:[]
    },
     reducers: {
    addSuccessRate: (state, action) => {
      state.successRate = action.payload;
    },
    addExecutionTime: (state, action) => {
      state.executionTime = action.payload;
    },
    addErrorRate: (state, action) => {
      state.errorRate = action.payload;
    },
    addAvgLatency: (state, action) => {
      state.avgLatency = action.payload;
    },
    addthroughPut: (state, action) => {
      state.throughPut = action.payload;
    },
    addTime: (state, action) => {
      state.time = action.payload;
    },
    addHistory: (state, action) => {
      state.history.push(action.payload);
    },
  },
});

export const {
  addSuccessRate,
  addExecutionTime,
  addErrorRate,
  addAvgLatency,
  addthroughPut,
  addTime,
  addHistory,
} = bobSlice.actions;

export default bobSlice.reducer;
