import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListingsByPriceDiffAPI } from "./listingsAPI";

// Thunks for hottest and coldest listings
export const fetchHottestListings = createAsyncThunk(
  "listings/fetchHottestListings",
  async ({ days = 1, limit = 10 }) => {
    return await fetchListingsByPriceDiffAPI({ days, limit, order: "desc" });
  }
);

export const fetchColdestListings = createAsyncThunk(
  "listings/fetchColdestListings",
  async ({ days = 1, limit = 10 }) => {
    return await fetchListingsByPriceDiffAPI({ days, limit, order: "asc" });
  }
);

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    hottest: [],
    coldest: [],
    hottestStatus: "idle",
    coldestStatus: "idle",
    hottestError: null,
    coldestError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHottestListings.pending, (state) => {
        state.hottestStatus = "loading";
      })
      .addCase(fetchHottestListings.fulfilled, (state, action) => {
        state.hottestStatus = "succeeded";
        state.hottest = action.payload;
      })
      .addCase(fetchHottestListings.rejected, (state, action) => {
        state.hottestStatus = "failed";
        state.hottestError = action.error.message;
      })
      .addCase(fetchColdestListings.pending, (state) => {
        state.coldestStatus = "loading";
      })
      .addCase(fetchColdestListings.fulfilled, (state, action) => {
        state.coldestStatus = "succeeded";
        state.coldest = action.payload;
      })
      .addCase(fetchColdestListings.rejected, (state, action) => {
        state.coldestStatus = "failed";
        state.coldestError = action.error.message;
      });
  },
});

export default listingsSlice.reducer;
