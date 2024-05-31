import { configureStore } from "@reduxjs/toolkit";
import { searchSliceReducer } from "./searchSlice";
import { sellDataReducer } from "./sellDataSlicer";

const store = configureStore({
  reducer: {
    search: searchSliceReducer,
    sellData: sellDataReducer,
  },
});

export default store;
