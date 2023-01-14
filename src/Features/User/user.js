import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  errorMessageProfile: "",
  errorMessageEdit: "",
  editName: false,
  newFirstName: "",
  newLastName: "",
};

let profileApi = "http://localhost:3001/api/v1/user/profile";

export const fetchUserData = createAsyncThunk(
  "user",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        profileApi,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUserProfileAttributes = createAsyncThunk(
  "userAttributes",
  async ({ token, firstName, lastName }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        profileApi,
        {
          firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
          lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleEditName: (state) => {
      state.editName = !state.editName;
      state.newFirstName = "";
      state.newLastName = "";
      state.errorMessageEdit = "";
    },
    changeName: (state, action) => {
      if (action.payload.type === "newFirstName") {
        state.newFirstName = action.payload.value;
      } else {
        state.newLastName = action.payload.value;
      }
    },
    resetUser: (state, action) => {
      state.user = null;
    },
    putErrorMessageEdit: (state, action) => {
      state.errorMessageEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.errorMessageProfile = action.payload?.message
        ? action.payload.message
        : action.error.message;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload.body;
    });
    builder.addCase(updateUserProfileAttributes.rejected, (state, action) => {
      state.newFirstName = "";
      state.newLastName = "";
      state.errorMessageEdit = action.payload?.message
        ? action.payload.message
        : action.error.message;
    });
    builder.addCase(updateUserProfileAttributes.fulfilled, (state, action) => {
      state.user.firstName = action.payload.body.firstName;
      state.user.lastName = action.payload.body.lastName;
      state.newFirstName = "";
      state.newLastName = "";
      state.editName = false;
      state.errorMessageEdit = "";
    });
  },
});

export const { changeName, resetUser, toggleEditName, putErrorMessageEdit } =
  userSlice.actions;

export default userSlice.reducer;
