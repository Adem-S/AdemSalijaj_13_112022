import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const loginApi = "http://localhost:3001/api/v1/user/login";
const profileApi = "http://localhost:3001/api/v1/user/profile";

/**
 * @description Retrieve the user token
 * @constructor
 * @param {object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @return {object}
 */
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

/**
 * @description Retrieve user data
 * @constructor
 * @param {string} token
 * @return {object}
 */
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

/**
 * @description update user info
 * @constructor
 * @param {object} userInfo
 * @param {string} userInfo.token
 * @param {string} userInfo.firstName
 * @param {string} userInfo.lastName
 * @return {object}
 */
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
