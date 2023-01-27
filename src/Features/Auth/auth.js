import { createSlice } from "@reduxjs/toolkit";
import { fetchUserByCredentials } from "../../Service/service";

export const initialState = {
  token: "",
  rememberMe: false,
  email: "",
  password: "",
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    toggleRememberMe: (state, action) => {
      state.rememberMe = !state.rememberMe;
    },
    changePassword: (state, action) => {
      state.password = action.payload;
    },
    logout: (state, action) => {
      state.rememberMe = false;
      state.token = "";
    },
    loginWithToken: (state, action) => {
      state.rememberMe = true;
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByCredentials.rejected, (state, action) => {
      state.errorMessage = action.payload?.message
        ? action.payload.message
        : action.error.message;
      state.token = "";
      state.email = "";
      state.password = "";
    });
    builder.addCase(fetchUserByCredentials.fulfilled, (state, action) => {
      state.errorMessage = "";
      state.token = action.payload.body.token;
    });
  },
});

export const {
  changeEmail,
  changePassword,
  logout,
  toggleRememberMe,
  loginWithToken,
} = authSlice.actions;

export default authSlice.reducer;
