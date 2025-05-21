import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../slice/taskSlice";
import piReducer from "../slice/piSlice";
import marcoReducer from "../slice/marcoSlice";
import bobReducer from "../slice/bobSlice";
 
export const store = configureStore({
    reducer:{
        task: taskReducer,
        pi:piReducer,
        marco:marcoReducer,
        bob:bobReducer
    }
})

