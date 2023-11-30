import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = "http://localhost:3001/server/feedbacks";
import setAuthToken from "../src/utils/setToken";

const initialState = {
  feedbacks: [],
  status: "idle",
};

// get all feedbacks
export const getAllFeedbacks = createAsyncThunk("feedbacks/all", async () => {
  try {
    setAuthToken(localStorage.token);
    const res = await axios.get(baseUrl);
    console.log(res.data);
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
});

//add new feedback
export const addFeedabck = createAsyncThunk(
  "feedbacks/add",
  async (formData) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.post(`${baseUrl}/new`, formData);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

//delete feedback
export const editFeedback = createAsyncThunk(
  "feedbacks/edit",
  async (formData) => {
    const id = formData.feedId;
    console.log(`id in editreducer is ${id}`);
    try {
      setAuthToken(localStorage.token);
      const res = await axios.put(`${baseUrl}/edit/${id}`, formData);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

//delete feedback
export const deleteFeed = createAsyncThunk(
  "feedbacks/delete",
  async ({ id }) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      return res.data;
    } catch (err) {
      throw err.response.data;
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedbacks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        (state.status = "success"), (state.feedbacks = action.payload);
      })
      .addCase(getAllFeedbacks.rejected, (state) => {
         state.status = "failed"
      })
      .addCase(editFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editFeedback.fulfilled, (state, action) => {
        state.status = "success";
        const updatedFeedback = action.payload;

        // Find the index of the post to be updated
        const index = state.feedbacks.findIndex(
          (feedback) => feedback.feedId === updatedFeedback.feedId
        );

        if (index !== -1) {
          // If the post is found, update it
          state.feedbacks[index] = updatedFeedback;
          state.status = "success";
        }
      })
      .addCase(editFeedback.rejected, (state) => {
        state.status = "erro";
      
      })

      // new feedback
      .addCase(addFeedabck.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFeedabck.fulfilled, (state, action) => {
        state.status = "success";
        state.feedbacks = [...state.feedbacks, action.payload];
      })

      .addCase(addFeedabck.rejected, (state) => {
        state.status = "idle";
      })
    // delete feedback
     .addCase(deleteFeed.pending, (state) => {
    state.status = "loading";
  })
  .addCase(deleteFeed.fulfilled, (state, action) => {
    state.status = "success";
    const deletedId = action.payload;
  
    // Remove the deleted feedback from the state
    state.feedbacks = state.feedbacks.filter(
      (feedback) => feedback.feedId !== deletedId
    );
  })
  .addCase(deleteFeed.rejected, (state) => {
    state.status = "error";
  
  })
      
  },
});

export const selectAllFeedbacks = (state) => state.feedbacks.feedbacks;
export const selectUserFeedback = (state, userId) =>
  state.feedbacks.feedbacks.find((feedback) => feedback.UserUserId === userId);
export default feedbackSlice.reducer;
