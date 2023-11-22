import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/server/blog";

// inital state
const initialState = {
    posts: [],
    status: 'idle',
    error: false
}

// get all blog post
export const getPost = createAsyncThunk("blog/all", async() =>{
    try {
    const res = await axios.get(`${baseUrl}/all`);
    console.log(res.data)
    return res.data;
    } catch (err) {
        return err.message
    }
})

// add new post
export const addPost = createAsyncThunk("blog/add", async(FormData) =>{
    try {
        const res = await axios.post(`${baseUrl}/add`, FormData);
        return res.data
    } catch (err) {
        return err.message;
    }
})

// update post
export const editPost = createAsyncThunk("blog/edit", async(FormData) =>{
    const id = FormData.postId;
    try {
        const res = await axios.post(`${baseUrl}/edit/${id}`, FormData);
        return res.data
    } catch (err) {
        return err.message;
    }
})

export const deletePost = createAsyncThunk("blog/delete", async(id) =>{
    try {
        const res = await axios.post(`${baseUrl}/delete/${id}`);
        return res.data
    } catch (err) {
        return err.message;
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
        .addCase(addPost.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(addPost.fulfilled, (state, action) =>{
            state.status = "success"
            state.posts = state.posts.push(action.payload)
        })
        .addCase(addPost.rejected, (state, action) =>{
            state.status = "rejected"
            state.error = action.error.message
        })
        .addCase(editPost.pending, (state) =>{
            state.status = "idle"
        })

        .addCase(editPost.fulfilled, (state, action) => {
            const updatedPost = action.payload;
    
            // Find the index of the post to be updated
            const index = state.posts.findIndex((post) => post.id === updatedPost.id);
    
            if (index !== -1) {
              // If the post is found, update it
              state.posts[index] = updatedPost;
              state.status = 'success';
            }
          })

          .addCase(editPost.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
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
          .addCase(deletePost.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.error.message;
          })
    }
})

export const selectPosts = (state) => state.blog.posts;
export const selectError = (state) => state.blog.error;
export const selectPost = (state, postId) => state.blog.posts.find(post => post.postId === postId);
export const selectStatus =(state) => state.blog.status;

export default blogSlice.reducer;