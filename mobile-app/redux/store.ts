import { configureStore } from "@reduxjs/toolkit";
import { tasks } from "./service/tasks";

export const store = configureStore({
  reducer: {
    [tasks.reducerPath]: tasks.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasks.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
