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

export function fetchSellData(search) {
  let url = `${baseUrl}/sales/getAll`;
  console.log(search, "<<");
  if (search) {
    url += `?search=${search.key}&order=${search.order}&sort=${search.sort}`;
  }
  return async (dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(setSellData(data.data));
  };
}

export const { setSellData } = sellDataSlice.actions;
export const sellDataReducer = sellDataSlice.reducer;
