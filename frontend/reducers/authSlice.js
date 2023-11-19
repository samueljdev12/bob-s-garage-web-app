import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// importing axiso for connecting to the backend
import axios from "axios";
//setting base url
const baseUrl = "http://localhost:3001/server";

// import set token util
import setAuthToken from "../src/utils/setToken";

// initial state
const initialState = {
  isAuth: !!localStorage.getItem("token"),
  user: {},
  token: localStorage.getItem("token"),
  status: "idle",
  error: {},
};

// login asychronously function start
export const loginAsync = createAsyncThunk("auth/login", async (formData) => {
  console.log("login in");
  try {
    const response = await axios.post(`${baseUrl}/login`, formData);

    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (err) {
    return err.tmessage;
  }
});

// login asychronously function end

// get user
export const getUser = createAsyncThunk("auth/user", async() => {
  try {
    setAuthToken(localStorage.token)
    const res = await axios.get(`${baseUrl}/user`)
    const isAdmin = res.data.isAdmin;
    localStorage.setItem("isAdmin", isAdmin);
    return res.data
  } catch (err) {
    return err.message
  }
});
// get user end

// create user 
export const register = createAsyncThunk("auth/register", async(fromData) =>{
  try {
      const res = await axios.post(`${baseUrl}/signup`, fromData);
      console.log(res.data)
      return true;
  } catch (err) {
    return err.message;
  }
})

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state)=>{
        localStorage.removeItem("token");
        state.isAuth = false;
        localStorage.removeItem("isAdmin");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.Error.message;
      })

      //get user
      .addCase(getUser.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) =>{
        state.status = "success";
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) =>{
        state.status = "failed";
        state.user = {};
        state.error = action.error.message;
      })
      //get user end

      // signup
      .addCase(register.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state) =>{
        state.status = "success";
      })
      .addCase(register.rejected, (state, action) =>{
        state.status = "failed"
        state.error = action.error.message
      })
  }
});

export const getAuthUser = (state) => state.auth.user;
export const isAuth = (state) => state.auth.isAuth;
export const getStatus = (state) => state.auth.status;


export const {logout} = authSlice.actions;

export default authSlice.reducer;
