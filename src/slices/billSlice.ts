// src/state/slices/billSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bill } from "../types/Bill";

interface BillState {
  bills: Bill[];
}

const initialState: BillState = {
  bills: [],
};

const billSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    updateBill: (state, action: PayloadAction<Bill>) => {
      const index = state.bills.findIndex(
        (bill) => bill.id === action.payload.id
      );
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    deleteBill: (state, action: PayloadAction<string>) => {
      state.bills = state.bills.filter((bill) => bill.id !== action.payload);
    },
  },
});

export const { addBill, updateBill, deleteBill } = billSlice.actions;
export default billSlice.reducer;
