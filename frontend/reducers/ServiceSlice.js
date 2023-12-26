import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "https://backend-z3wy.onrender.com/server/services";
import setAuthToken from "../src/utils/setToken";

// state
const initialState = {
    services: [],
    status: "idle"
}

// get all services
export const getServices = createAsyncThunk("services/all", async() =>{
    try {
        setAuthToken(localStorage.token)
        const res = await axios.get(baseUrl);
    console.log(res.data)
    return res.data
    } catch (err) {
        throw err.response.data;
    }
    
})


// add feedback
export const addServices = createAsyncThunk("services/add", async(formData) =>{
    try {
        setAuthToken(localStorage.token)
         const res = await axios.post(`${baseUrl}/new`, formData);
         return res.data
    } catch (err) {
        throw err.response.data;
    }
})

// delete
export const deleteService = createAsyncThunk("services/delete", async({id}) =>{
    try {
        setAuthToken(localStorage.token)
        const res = await axios.delete(`${baseUrl}/delete/${id}`);
        return res.data;
    } catch (err) {
        throw err.response.data;
    }
})

// edit services
export const editService = createAsyncThunk("/services/edit", async(formData) =>{
    const id = formData.serviceId;
    const formdata = {
        name: formData.name,
        description: formData.description,
        price: formData.price
    }
    try {
        setAuthToken(localStorage.token)
        const res = await axios.put(`${baseUrl}/edit/${id}`, formdata);
        return res.data;
    } catch (err) {
        throw err.response.data;
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
            state.status = "success"
            state.services = action.payload
        })

        .addCase(getServices.rejected, (state) =>{
            state.status = "failed"
        })
        .addCase(addServices.pending, (state) =>{
            state.status = "idle"
        })
        .addCase(addServices.fulfilled, (state, action) =>{
            state.status = "success"
            state.services = [...state.services, action.payload]
        })
        .addCase(addServices.rejected, (state) =>{
            state.status = "error"
        })
        .addCase(editService.pending, (state) =>{
            state.status = 'idle'
        })
        .addCase(editService.fulfilled, (state, action) =>{
            const updatedService = action.payload;
    
            // Find the index of the post to be updated
            const index = state.services.findIndex((service) => service.serviceId === updatedService.serviceId);
    
            if (index !== -1) {
              // If the post is found, update it
              state.services[index] = updatedService;
              state.status = 'success';
            }
        })
        .addCase(editService.rejected, (state) =>{
            state.status = "failed"
        })
        .addCase(deleteService.pending, (state) =>{
            state.status = "loading"
        })
        .addCase(deleteService.fulfilled, (state, action) =>{
            state.status = "success" 
            const deleteId = action.payload
            state.services = state.services.filter((service) => service.serviceId !== deleteId)
        })
        .addCase(deleteService.rejected, (state) =>{
            state.status = "failed"
        })
        
        
    }
})


export const getAllServices = (state) => state.services.services;
export const selectService = (state, serviceId) => state.services.services.find(service => service.serviceId === serviceId);

export default serviceSlice.reducer;