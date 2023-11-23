import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { editPost } from "./BlogReducer";
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

//add new feedback
export const addFeedabck = createAsyncThunk("feedbacks/add", async(formData) =>{
    try {
         const res = await axios.post(`${baseUrl}/new`, formData);
         return res.data
    } catch (err) {
        return err.message
    }
})

//delete feedback
export const editFeedback = createAsyncThunk("feedbacks/edit", async(formData, id) =>{
    try {
        const res = await axios.put(`${baseUrl}/edit/${id}`, formData);
        return res.data
    } catch (err) {
        return err.message
    }
})

//delete feedback
export const deleteFeeback = createAsyncThunk("feedbacks/add", async(formData) =>{
    const id = formData.feedId
    try {
         const res = await axios.put(`${baseUrl}/delete/${id}`);
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
            state.status = "success",
            state.feedbacks = action.payload
         })
         .addCase(getAllFeedbacks.rejected, (state) =>{
            state.status = "idle",
            state.error = true
         })
         .addCase(editFeedback.pending, (state) =>{
            state.status = "loading"
         })
         .addCase(editFeedback.fulfilled, (state, action) =>{
            const updatedFeedback = action.payload;
    
            // Find the index of the post to be updated
            const index = state.feedbacks.findIndex((feedback) => feedback.feedId === updatedFeedback.id);
    
            if (index !== -1) {
              // If the post is found, update it
              state.posts[index] = updatedFeedback;
              state.status = 'success';
            }
         })
         .addCase(editFeedback.rejected, (state, action) =>{
            state.status = "erro"
            state.error = action.error.message
         })

         // new feedback
         .addCase(addFeedabck.pending, (state) =>{
            state.status = "loading"
         })
         .addCase(addFeedabck.fulfilled, (state, action) =>{
            state.status ="success"
            state.feedbacks = state.feedbacks.push(action.payload)
         })

         .addCase(addFeedabck.rejected, (state) =>{
            state.status = "idle"
            state.error = true
         })
    }
})

export const selectAllFeedbacks = (state) => state.feedbacks.feedbacks;
export const selectUserFeedback = (state, userId) => state.feedbacks.feedbacks.find(feedback => feedback.UserUserId === userId);
export default feedbackSlice.reducer;