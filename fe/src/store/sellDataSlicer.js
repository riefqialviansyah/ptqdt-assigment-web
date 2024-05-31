import { createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const sellDataSlice = createSlice({
  name: "sellData",
  initialState: { data: [] },
  reducers: {
    setSellData(state, action) {
      state.data = action.payload;
    },
  },
});

export function fetchSellData(searchKey) {
  console.log(searchKey);
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/sales/getAll?search=Makanan`);
    const data = await response.json();
    dispatch(setSellData(data.data));
  };
}

export const { setSellData } = sellDataSlice.actions;
export const sellDataReducer = sellDataSlice.reducer;
