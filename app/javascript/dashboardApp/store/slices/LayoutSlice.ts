import { createSlice } from "@reduxjs/toolkit";

export const LayoutSlice = createSlice({
  name: "layout",
  initialState: {
    sidebarOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
  },
});

export const { toggleSidebar, closeSidebar, openSidebar } = LayoutSlice.actions;
