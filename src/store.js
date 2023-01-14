import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/Auth/auth";
import userSlice from "./Features/User/user";

export const store = configureStore({
  reducer: { authSlice, userSlice },
});
