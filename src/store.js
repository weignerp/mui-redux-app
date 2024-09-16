import { configureStore } from "@reduxjs/toolkit";

configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
