import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userApiSlice from "../features/user/userApiSlice";
import userApi from "../features/user/userApi";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware),
});
