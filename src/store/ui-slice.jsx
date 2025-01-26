import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCreateProject: false,
    showSidebar: true,
  },
  reducers: {
    newProject(state) {
      state.showCreateProject = !state.showCreateProject;
    },

    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },
  },
});
