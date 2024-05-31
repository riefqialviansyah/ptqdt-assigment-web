import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { key: "apa saja" },
  reducers: {
    setSearchKey(state, action) {
      state.key = action.payload;
    },
  },
});

export const { setSearchKey } = searchSlice.actions;
export const searchSliceReducer = searchSlice.reducer;
