// store file
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";
import feedbacksReducer from "../reducers/FeedbackSlice";
import serviceReducer from "../reducers/ServiceSlice";
import themeRedcuer from "../reducers/ThemeSlice"
import ThemeSlice from "../reducers/ThemeSlice";


export const store = configureStore({

    reducer: {
        auth: authReducer,
        feedbacks: feedbacksReducer,
        services: serviceReducer,
        theme: themeRedcuer
        


    }
    
});