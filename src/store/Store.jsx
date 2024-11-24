import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "./JobSlice";

const store = configureStore({
  reducer: {
    job: JobSlice,
  },
});
export default store;
