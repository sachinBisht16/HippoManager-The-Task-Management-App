import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCreateProject: false,
  },
  reducers: {
    newProject(state) {
      state.showCreateProject = !state.showCreateProject;
    },
  },
});
