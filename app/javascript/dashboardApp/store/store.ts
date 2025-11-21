import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/ApiSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { LayoutSlice } from "./slices/LayoutSlice";
import { UnitsSlice } from "./slices/UnitsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    layout: LayoutSlice.reducer,
    units: UnitsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
