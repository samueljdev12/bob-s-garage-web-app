import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../src/utils/setToken";

const baseUrl = "https://backend-z3wy.onrender.com/server";

const initialState = {
  isAuth: localStorage.getItem("token") ? true : false,
  user: {},
  token: localStorage.getItem("token"),
  isLoading: false,
  isAdmin: false,
};

export const loginAsync = createAsyncThunk("auth/login", async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/login`, formData);
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (err) {
    throw err.response.data;
  }
});

export const getUser = createAsyncThunk("auth/user", async () => {
  try {
    setAuthToken(localStorage.token);
    const res = await axios.get(`${baseUrl}/user`);
    localStorage.setItem("isAdmin", res.data.isAdmin);
    localStorage.setItem("userId", res.data.userId)
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
});

export const register = createAsyncThunk("auth/register", async (formData) => {
  try {
    const res = await axios.post(`${baseUrl}/signup`, formData);
    return true;
  } catch (err) {
    throw err.response.data;
  }
});

export const edit = createAsyncThunk("auth/edit", async (formData) => {
  setAuthToken(localStorage.token);
  try {
    const res = await axios.post(`${baseUrl}/user/edit`, formData);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      localStorage.removeItem("userId");
      state.isAuth = false;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
        
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        state.isAdmin = action.payload.isAdmin;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = "failed";
        state.user = {};
        
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
       
      })
      .addCase(edit.pending, (state) => {
        state.status = "loading";
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(edit.rejected, (state) => {
        state.status = "failed";
        
      });
  },
});

export const getAuthUser = (state) => state.auth.user;
export const isAuth = (state) => state.auth.isAuth;
export const isAdmin = (state) => state.auth.isAdmin;
export const getisLoading = (state) => state.auth.isLoading;
export const getError = (state) => state.auth.error; 

export const { logout, resetError, resetStatus } = authSlice.actions;

export default authSlice.reducer;
