import { configureStore } from "@reduxjs/toolkit";
import { taskSlice } from "./task-slice";
import syncMiddleware from "./syncMiddleware";

const store = configureStore({
  reducer: taskSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncMiddleware),
});

export const taskActions = taskSlice.actions;
export default store;
