import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCardsAPI } from "./cardsAPI";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async (filters) => {
    return await fetchCardsAPI(filters);
  }
);

const cardsSlice = createSlice({
  name: "cards",
  initialState: { list: [], page: 1, limit: 50, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.data;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cardsSlice.reducer;
