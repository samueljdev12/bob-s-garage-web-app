import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/server/blog/all";

// inital state
const initialState = {
    posts: [],
    status: 'idle',
    error: false
}

// get all blog post
export const getPost = createAsyncThunk("blog/all", async() =>{
    try {
    const res = await axios.get(`${baseUrl}`);
    console.log(res.data)
    return res.data;
    } catch (err) {
        return err.message
    }
})

// slice
const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(getPost.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(getPost.fulfilled, (state, action) =>{
            state.status = "idle"
            state.posts = action.payload
            
            
        })
        .addCase(getPost.rejected, (state, action) =>{
            state.status = "idle"
            state.posts = []
            state.error = true
        })
    }
})

export const selectPosts = (state) => state.blog.posts;
export const selectError = (state) => state.blog.error;
export const selectPost = (state, postId) => state.blog.posts.find(post => post.postId === postId);

export default blogSlice.reducer;