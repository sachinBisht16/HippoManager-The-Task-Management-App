import { configureStore } from "@reduxjs/toolkit";
import { projectSlice } from "./projectSlice";
import { uiSlice } from "./ui-slice";
import syncMiddleware from "./syncMiddleware";

const store = configureStore({
  reducer: {
    projects: projectSlice.reducer,
    ui: uiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncMiddleware),
});

export const uiActions = uiSlice.actions;
export const projectActions = projectSlice.actions;
export default store;
