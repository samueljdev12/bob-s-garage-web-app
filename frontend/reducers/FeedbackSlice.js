import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/server/feedbacks";

const initialState = {
    feedbacks: [],
    status: "idle",
    error: false
}


// get all feedbacks 
export const getAllFeedbacks = createAsyncThunk("feedbacks/all", async() =>{
    try {
        const res = await axios.get(baseUrl);
        console.log(res.data)
        return res.data
    } catch (err) {
        return err.message
    }
})



const feedbackSlice = createSlice({
    name: "feedbacks",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
         builder
         .addCase(getAllFeedbacks.pending, (state)=>{
            state.status = "loading"
         })
         .addCase(getAllFeedbacks.fulfilled, (state, action) =>{
            state.status = "idle",
            state.feedbacks = action.payload
         })
         .addCase(getAllFeedbacks.rejected, (state, action) =>{
            state.status = "idle",
            state.feedbacks = [],
            state.error = true
         })
    }
})

export const selectAllFeedbacks = (state) => state.feedbacks.feedbacks;

export default feedbackSlice.reducer;