import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  initialState: {
    loading: false,
    loadingText: "",
    error: false,
    errorText: "",
    sidebarOpen: true,
  },
  name: "app",
  reducers: {
    toggleSideBar: (state) => ({
      ...state,
      sidebarOpen: !state.sidebarOpen,
    }),
    startLoading: (state, { payload }) => ({
      ...state,
      loading: true,
      loadingText: payload || "",
    }),
    endLoading: (state) => ({
      ...state,
      loading: false,
      loadingText: "",
    }),
    startError: (state, { payload }) => ({
      ...state,
      error: true,
      errorText: payload || "",
    }),
    endError: (state) => ({
      ...state,
      error: false,
      errorText: "",
    }),
  },
});

export const { startLoading, endLoading, startError, endError, toggleSideBar } =
  appSlice.actions;

export default appSlice.reducer;
