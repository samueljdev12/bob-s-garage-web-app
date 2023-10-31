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

    //handle errors

    if (response.status === 400) {
      console.log(response.data);
      throw Error({ message: response.data });
    }

    // process the response
    console.log(`The toekn in authslice loginasync is: ${response.data.token}`);
    localStorage.setItem("token", response.data.token);
    return response.data.token;
  } catch (err) {
    return err.message;
  }
});

// login asychronously function end

// get user
export const getUser = createAsyncThunk("auth/user", async() => {
   console.log("getting user")
  try {
    setAuthToken(localStorage.token)
    const res = await axios.get(`${baseUrl}/user`)
    return res.data
  } catch (err) {
    return err.message
  }
});
// get user end

// auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state)=>{
        localStorage.removeItem("token");
        state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload.Error.message;
      })

      //get user
      .addCase(getUser.pending, (state) =>{
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) =>{
        state.status = "idle";
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) =>{
        state.status = "idle";
        state.user = {};
        state.error = action.error.message;
      })
      //get user end
  }
});

export const getAuthUser = (state) => state.auth.user;
export const isAuth = (state) => state.auth.isAuth;


export const {logout} = authSlice.actions;

export default authSlice.reducer;
