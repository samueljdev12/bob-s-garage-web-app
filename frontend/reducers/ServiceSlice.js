import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/server/services";

// state
const initialState = {
    services: [],
    status: "idle",
    error: false
}

// get all services
export const getServices = createAsyncThunk("services/all", async() =>{
    try {
        const res = await axios.get(baseUrl);
    console.log(res.data)
    return res.data
    } catch (err) {
        return err.message;
    }
    
})



// slice
const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getServices.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(getServices.fulfilled, (state, action) =>{
            state.status = "idle"
            state.services = action.payload
        })

        .addCase(getServices.rejected, (state, action) =>{
            state.status = "idle",
            state.error = action.error.message
            state.services = []
        })
    }
})


export const getAllServices = (state) => state.services.services;

export default serviceSlice.reducer;