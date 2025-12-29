import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCardNamesAPI } from "./cardsAPI";

export const fetchCardNames = createAsyncThunk(
  "cards/fetchCardNames",
  async (filters) => {
    return await fetchCardNamesAPI(filters);
  }
);

const cardsSearchSlice = createSlice({
  name: "cardsSearch",
  initialState: { cards: [], limit: 20, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardNames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCardNames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload.data;
        state.limit = action.payload.limit;
      })
      .addCase(fetchCardNames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cardsSearchSlice.reducer;