import { createSlice } from "@reduxjs/toolkit";
import type { dataState, SalesData } from "../types/sales";

const initialState: dataState = {
  title: "",
  image: "",
  subtitle: "",
  tags: [],
  salesData: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    displayData: (state, action) => {
      const data = action.payload;
      const { title, image, subtitle, tags, sales } = data[0];
      state.title = title;
      state.image = image;
      state.subtitle = subtitle;
      state.tags = tags;
      state.salesData = sales.map((sale: SalesData) => {
        return {
          weekEnding: sale.weekEnding,
          retailSales: sale.retailSales,
          wholesaleSales: sale.wholesaleSales,
          unitsSold: sale.unitsSold,
          retailerMargin: sale.retailerMargin,
        };
      });
    },
  },
});

export const { displayData } = dataSlice.actions;

export default dataSlice.reducer;
