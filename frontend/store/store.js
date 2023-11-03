// store file
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import blogReducer from "../reducers/BlogReducer";
import feedbacksReducer from "../reducers/FeedbackSlice";

export const store = configureStore({

    reducer: {
        auth: authReducer,
        blog: blogReducer,
        feedbacks: feedbacksReducer

    }
    
});