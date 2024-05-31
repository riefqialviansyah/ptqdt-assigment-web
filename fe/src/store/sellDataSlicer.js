import { createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_SERVER_URL;

const sellDataSlice = createSlice({
  name: "sellData",
  initialState: {
    data: [],
    statusData: "search",
    dataBarang: [],
    statistikSellAmount: {},
  },
  reducers: {
    setSellData(state, action) {
      state.data = action.payload;
    },
    setStatusData(state, action) {
      state.statusData = action.payload;
    },
    setDataBarang(state, action) {
      state.dataBarang = action.payload;
    },
    setStatistikSellAmount(state, action) {
      state.statistikSellAmount = action.payload;
    },
  },
});

export function fetchSellData(search) {
  let url = `${baseUrl}/sales/getAll`;
  if (search) {
    url += `?search=${search?.key}&order=${search?.order}&sort=${search?.sort}`;
  }
  return async (dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(setSellData(data.data));
  };
}

export function fetchDataStatistic(filter) {
  let url = `${baseUrl}/sales/lowAndHighData`;

  if (filter.from) {
    url += `?filter[from]=${filter.from}&filter[to]=${filter.to}&filter[type]=${filter.type}`;
  }

  return async (dispatch) => {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(setSellData(data.data));
  };
}

export function fetchDataBarang() {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/sales/goodsKind`);

    const data = await response.json();

    dispatch(setDataBarang(data.data));
  };
}

export function fetchStatistikSellAmount() {
  return async (dispatch) => {
    const response = await fetch(`${baseUrl}/sales/statisticSellAmount`);
    const data = await response.json();
    dispatch(setStatistikSellAmount(data.data));
  };
}

export const {
  setSellData,
  setStatistik,
  setStatusData,
  setDataBarang,
  setStatistikSellAmount,
} = sellDataSlice.actions;
export const sellDataReducer = sellDataSlice.reducer;
