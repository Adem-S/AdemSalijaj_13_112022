import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginApi = "http://localhost:3001/api/v1/user/login";

export const initialState = {
  token: "",
  rememberMe: false,
  email: "",
  password: "",
  errorMessage: "",
};

export const fetchUserByCredentials = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(loginApi, credentials);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

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
