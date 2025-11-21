import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "../features/cards/cardsSlice";
import listingsReducer from "../features/listings/listingsSlice";
import reportsReducer from "../features/reports/reportsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    listings: listingsReducer,
    reports: reportsReducer,
  },
});

export default store;
