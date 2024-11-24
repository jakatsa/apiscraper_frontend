import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

//fetching using create thunk
export const getJob = createAsyncThunk("jobs/get", async () => {
  const data = await fetch("http://127.0.0.1:8000/api/jobs/");
  const result = await data.json();
  return result;
});
//fetching id using create thunk
export const getJobById = createAsyncThunk("jobs/getById", async (id) => {
  const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`);
  const result = await response.json();
  return result;
});

const jobSlice = createSlice({
  name: "job",
  initialState,

  //hadnles async tasks in updating statee
  extraReducers: (builder) => {
    //handling pending status with 'loading' text
    builder
      .addCase(getJob.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "Idle";
      })
      .addCase(
        (getJob.rejected,
        (state, action) => {
          state.status = "Error";
        })
      );
  },
});

export default jobSlice.reducer;
