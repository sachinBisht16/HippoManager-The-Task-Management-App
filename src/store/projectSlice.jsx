import { createSlice } from "@reduxjs/toolkit";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "INPROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    user: {},
    columns: COLUMNS,
    filterBy: { category: null, dueDate: null },
    search: "",
    projects: [],
    currentProject: {},
    latestEntries: {
      title: "",
      description: "",
      status: "",
      category: "",
      dueDate: "",
    },
  },
  reducers: {
    createProject(state, actions) {
      const { projectId, projectName } = actions.payload;

      state.projects.push({
        id: projectId,
        name: projectName,
        tasks: [],
      });
    },

    openProject(state, actions) {
      state.currentProject =
        state.projects.find((project) => project.id === actions.payload?.id) ||
        {};
    },

    deleteProject(state, actions) {
      state.projects = state.projects.filter(
        (project) => project.id !== actions.payload.id
      );
    },

    updateUser(state, action) {
      state.user = action.payload;
    },

    reset(state) {
      state.user = "";
      state.tasks = [];
      state.columns = COLUMNS;
      state.filterBy = { category: null, dueDate: null };
      state.projects = [];
      state.search = "";
      state.currentProject = {};
      state.latestEntries = {
        title: "",
        description: "",
        status: "",
        category: "",
        dueDate: "",
      };
    },

    retrieveData(state, action) {
      const { projects } = action.payload;
      projects ? (state.projects = projects) : (state.projects = []);
    },

    newTask(state, action) {
      if (!state.currentProject.tasks) state.currentProject.tasks = [];
      state.currentProject.tasks.push({
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        status: action.payload.status,
        category: action.payload.category,
        dueDate: action.payload.dueDate,
        activityData: {
          createdOn: Date.now(),
          movedFrom: "",
          movedOn: "",
        },
      });

      state.projects = state.projects.map((project) =>
        project.id === state.currentProject.id ? state.currentProject : project
      );
    },

    deleteTask(state, action) {
      state.currentProject.tasks = state.currentProject.tasks.filter(
        (task) => task.id !== action.payload.id
      );

      state.projects = state.projects.map((project) =>
        project.id === state.currentProject.id ? state.currentProject : project
      );
    },

    editTask(state, action) {
      state.currentProject.tasks = state.currentProject.tasks.map((task) =>
        task.id === action.payload.id ? { ...action.payload } : task
      );

      state.projects = state.projects.map((project) =>
        project.id === state.currentProject.id ? state.currentProject : project
      );

      // state.currentProject.tasks.activityData.updatedOn = new Date()
      //   .toISOString()
      //   .split("T")[0];
    },

    setEntries(state, action) {
      state.latestEntries[action.payload.name] = action.payload.value;
    },

    updateTask(state, action) {
      const taskIndex = state.currentProject.tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (taskIndex !== -1) {
        state.currentProject.tasks[taskIndex].activityData.movedOn = Date.now();
        state.currentProject.tasks[taskIndex].activityData.movedFrom =
          state.currentProject.tasks[taskIndex].status;
      }

      state.currentProject.tasks = state.currentProject.tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, status: action.payload.newStatus }
          : task
      );

      state.projects = state.projects.map((project) =>
        project.id === state.currentProject.id ? state.currentProject : project
      );
    },

    filterTask(state, action) {
      state.filterBy[action.payload.name] =
        action.payload.name === action.payload.value
          ? null
          : action.payload.value;
    },

    searchFilter(state, action) {
      state.search = action.payload;
    },

    clearTask(state) {
      state.latestEntries = {
        title: "",
        description: "",
        status: "",
        category: "",
        dueDate: "",
      };
    },
  },
});
