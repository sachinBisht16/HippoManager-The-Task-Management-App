import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showCreateProject: false,
    showSidebar: true,
    showProjects: true,
    viewMode: "board",
    deleteProjectButtonIndex: null,
  },
  reducers: {
    updateView(state, actions) {
      state.viewMode = actions.payload.view;
    },

    newProject(state) {
      state.showCreateProject = !state.showCreateProject;
    },

    toggleSidebar(state) {
      state.showSidebar = !state.showSidebar;
    },

    toggleProjects(state) {
      state.showProjects = !state.showProjects;
    },

    toggleDeleteProjectButton(state, actions) {
      state.deleteProjectButtonIndex = actions.payload.index;
    },
  },
});
