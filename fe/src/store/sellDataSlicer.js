import { createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const sellDataSlice = createSlice({
  name: "sellData",
  initialState: { data: [], statistik: [] },
  reducers: {
    setSellData(state, action) {
      state.data = action.payload;
    },
    setStatistik(state, action) {
      state.statistik = action.payload;
    },
  },
});

export function fetchSellData(search) {
  let url = `${baseUrl}/sales/getAll`;
  if (search) {
    url += `?search=${search.key}&order=${search.order}&sort=${search.sort}`;
  }
  return async (dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(setSellData(data.data));
  };
}

export function fetchDataStatistic() {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/sales/lowAndHighData`);
    const data = await response.json();
    dispatch(setStatistik(data.data));
  };
}

export const { setSellData, setStatistik } = sellDataSlice.actions;
export const sellDataReducer = sellDataSlice.reducer;
