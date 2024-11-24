import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
  jobDetails: null,
  detailsStatus: "idle",
  error: null,
};

// Fetching all jobs using createAsyncThunk
export const getJob = createAsyncThunk("jobs/get", async () => {
  const response = await fetch("http://127.0.0.1:8000/api/jobs/");
  const result = await response.json();
  return result;
});

// Fetching a job by ID using createAsyncThunk
export const getJobById = createAsyncThunk("jobs/getById", async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`);
  const result = await response.json();
  return result;
});

const jobSlice = createSlice({
  name: "job",
  initialState,

  extraReducers: (builder) => {
    builder
      // Handling `getJob`
      .addCase(getJob.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "Idle";
      })
      .addCase(getJob.rejected, (state, action) => {
        state.status = "Error";
        state.error = action.error.message;
      })
      // Handling `getJobById`
      .addCase(getJobById.pending, (state) => {
        state.detailsStatus = "Loading";
        state.jobDetails = null; // Clear previous details while loading
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.jobDetails = action.payload;
        state.detailsStatus = "Idle";
      })
      .addCase(getJobById.rejected, (state, action) => {
        state.detailsStatus = "Error";
        state.error = action.error.message;
      });
  },
});

export default jobSlice.reducer;
