import { createSlice } from "@reduxjs/toolkit";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "INPROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    user: {},
    tasks: [],
    columns: COLUMNS,
    filterBy: { category: null, dueDate: null },
    latestEntries: {
      title: "",
      description: "",
      status: "",
      category: "",
      dueDate: "",
    },
    search: "",
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },

    reset(state) {
      state.user = "";
      state.tasks = [];
      state.columns = COLUMNS;
      state.filterBy = { category: null, dueDate: null };
      state.latestEntries = {
        title: "",
        description: "",
        status: "",
        category: "",
        dueDate: "",
      };
      state.search = "";
    },

    retrieveData(state, action) {
      const { tasks } = action.payload;
      tasks ? (state.tasks = tasks) : (state.tasks = []);
    },

    newTask(state, action) {
      state.tasks.push({
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
    },

    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex].activityData.movedOn = Date.now();
        state.tasks[taskIndex].activityData.movedFrom =
          state.tasks[taskIndex].status;
      }

      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, status: action.payload.newStatus }
          : task
      );
    },

    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },

    editTask(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...action.payload } : task
      );

      state.tasks.activityData.updatedOn = new Date()
        .toISOString()
        .split("T")[0];
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
    setEntries(state, action) {
      state.latestEntries[action.payload.name] = action.payload.value;
    },
  },
});
