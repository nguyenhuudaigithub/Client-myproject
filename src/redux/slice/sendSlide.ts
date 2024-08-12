import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callFetchSend } from "@/config/api";
import { ISend } from "@/types/backend";

interface IState {
  isFetching: boolean;
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: ISend[];
}
// First, create the thunk
export const fetchSend = createAsyncThunk(
  "send/fetchSend",
  async ({ query }: { query: string }) => {
    const response = await callFetchSend(query);
    return response;
  }
);

const initialState: IState = {
  isFetching: true,
  meta: {
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  },
  result: [],
};

export const sendSlide = createSlice({
  name: "send",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSend.pending, (state, action) => {
      state.isFetching = true;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchSend.rejected, (state, action) => {
      state.isFetching = false;
      // Add user to the state array
      // state.courseOrder = action.payload;
    });

    builder.addCase(fetchSend.fulfilled, (state, action) => {
      if (action.payload && action.payload.data) {
        state.isFetching = false;
        state.meta = action.payload.data.meta;
        state.result = action.payload.data.result;
      }
      // Add user to the state array

      // state.courseOrder = action.payload;
    });
  },
});

export const {} = sendSlide.actions;

export default sendSlide.reducer;
