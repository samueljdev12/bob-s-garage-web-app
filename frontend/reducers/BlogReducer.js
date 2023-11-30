import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/server/blog";
import setAuthToken from "../src/utils/setToken";

// inital state
const initialState = {
    posts: [],
    status: 'idle',
}

// get all blog post
export const getPost = createAsyncThunk("blog/all", async() =>{
    try {
    setAuthToken(localStorage.token)
    const res = await axios.get(`${baseUrl}/all`);
    return res.data;
    } catch (err) {
        throw err.response.data;
    }
})

// add new post
export const addPost = createAsyncThunk("blog/add", async(FormData) =>{
    try {
        setAuthToken(localStorage.token)
        const res = await axios.post(`${baseUrl}/add`, FormData);
        return res.data
    } catch (err) {
        throw err.response.data;
    }
})

// update post
export const editPost = createAsyncThunk("blog/edit", async(FormData) =>{
    const id = FormData.postId;
    try {
        setAuthToken(localStorage.token)
        const res = await axios.put(`${baseUrl}/edit/${id}`, FormData);
        return res.data
    } catch (err) {
        throw err.response.data;
    }
})

export const deletePost = createAsyncThunk("blog/delete", async(id) =>{
    try {
        setAuthToken(localStorage.token)
        const res = await axios.delete(`${baseUrl}/delete/${id}`);
        return res.data
    } catch (err) {
        throw err.response.data;
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
        .addCase(getPost.rejected, (state) =>{
            state.status = "idle"
            state.posts = []
        })
        .addCase(addPost.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(addPost.fulfilled, (state, action) =>{
            state.status = "success"
            state.posts = [...state.posts, action.payload]
        })
        .addCase(addPost.rejected, (state) =>{
            state.status = "failed"
          
        })
        .addCase(editPost.pending, (state) =>{
            state.status = "idle"
        })

        .addCase(editPost.fulfilled, (state, action) => {
            const updatedPost = action.payload;
    
            // Find the index of the post to be updated
            const index = state.posts.findIndex((post) => post.postId === updatedPost.postId);
    
            if (index !== -1) {
              // If the post is found, update it
              state.posts[index] = updatedPost;
              state.status = 'success';
            }
          })

          .addCase(editPost.rejected, (state) => {
            state.status = 'error';
          })

          /// delet post
          .addCase(deletePost.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deletePost.fulfilled, (state, action) => {
            state.status = 'success';
            // Assuming the action.payload is the deleted post ID
            state.posts = state.posts.filter((post) => post.postId !== action.payload);
          })
          .addCase(deletePost.rejected, (state) => {
            state.status = 'error';
          })
    }
})

export const selectPosts = (state) => state.blog.posts;
export const selectError = (state) => state.blog.error;
export const selectPost = (state, postId) => state.blog.posts.find(post => post.postId === postId);
export const selectStatus =(state) => state.blog.status;

export default blogSlice.reducer;