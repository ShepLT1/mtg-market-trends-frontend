import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListingsByPriceDiffAPI } from "../listings/listingsAPI";

export const generateReport = createAsyncThunk(
  "reports/generateReport",
  async ({ limit, order, days, trend, unit, amount }) => {
    const data = await fetchListingsByPriceDiffAPI({ limit, order, days });
    return { data, trend, unit, amount, limit };
  }
);

const STORAGE_KEY = "reportHistory";

const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (history) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    report: [],
    history: loadFromStorage(),
    trend: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateReport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.report = action.payload.data;
        state.trend = action.payload.trend;

        // Add full entry to history
        const newEntry = {
          trend: action.payload.trend,
          unit: action.payload.unit,
          amount: action.payload.amount,
          limit: action.payload.limit,
        };

        state.history = [newEntry, ...state.history].slice(0, 10);
        saveToStorage(state.history);
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reportsSlice.reducer;
