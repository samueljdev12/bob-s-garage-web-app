import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/server/services";
import setAuthToken from "../src/utils/setToken";

// state
const initialState = {
    services: [],
    status: "idle",
    error: false
}

// get all services
export const getServices = createAsyncThunk("services/all", async() =>{
    try {
        setAuthToken(localStorage.token)
        const res = await axios.get(baseUrl);
    console.log(res.data)
    return res.data
    } catch (err) {
        return err.message;
    }
    
})


// add feedback
export const addServices = createAsyncThunk("services/add", async(formData) =>{
    try {
        setAuthToken(localStorage.token)
         const res = await axios.post(`${baseUrl}/new`, formData);
         return res.data
    } catch (err) {
        return err.message
    }
})

// delete
export const deleteService = createAsyncThunk("services/delete", async({id}) =>{
    try {
        setAuthToken(localStorage.token)
        const res = await axios.delete(`${baseUrl}/delete/${id}`);
        return res.data;
    } catch (err) {
        return err.message
    }
})

// edit services
export const editService = createAsyncThunk("/services/edit", async(formData) =>{
    const id = formData.serviceId;
    console.log(`slice id is ${id}`)
    try {
        setAuthToken(localStorage.token)
        const res = await axios.put(`${baseUrl}/edit/${id}`, formData);
        return res.data;
    } catch (err) {
        return err.message
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
        .addCase(addServices.pending, (state) =>{
            state.status = "idle"
        })
        .addCase(addServices.fulfilled, (state, action) =>{
            state.status = "success"
            state.services = state.services.push(action.payload)
        })
        .addCase(addServices.rejected, (state) =>{
            state.status = "error"
            state.error = true
        })
        .addCase(editService.pending, (state) =>{
            state.status = 'idle'
        })
        .addCase(editService.fulfilled, (state, action) =>{
            const updatedService = action.payload;
    
            // Find the index of the post to be updated
            const index = state.services.findIndex((feedback) => feedback.feedId === updatedService);
    
            if (index !== -1) {
              // If the post is found, update it
              state.services[index] = updatedService;
              state.status = 'success';
            }
        })
        .addCase(editService.rejected, (state) =>{
            state.status = "failed"
            state.error = true
        })
        .addCase(deleteService.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(deleteService.fulfilled, (state) =>{
            state.status = "success"
        })
        .addCase(deleteService.rejected, (state) =>{
            state.status = "failed"
        })
        
        
    }
})


export const getAllServices = (state) => state.services.services;
export const selectService = (state, serviceId) => state.services.services.find(service => service.serviceId === serviceId);

export default serviceSlice.reducer;