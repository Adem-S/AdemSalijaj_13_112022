import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUserData,
  updateUserProfileAttributes,
} from "../../Service/service";

const initialState = {
  user: null,
  errorMessageProfile: "",
  errorMessageEdit: "",
  editName: false,
  newFirstName: "",
  newLastName: "",
};

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
