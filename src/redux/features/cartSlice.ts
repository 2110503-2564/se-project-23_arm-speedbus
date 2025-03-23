import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";
type CartState = {
  carItems: ReservationItem[];
};
const initialState: CartState = { carItems: [] };
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<ReservationItem>) => {
      state.carItems.push(action.payload);
    },
    removeReservation: (state, action: PayloadAction<ReservationItem>) => {
      const remainItems = state.carItems.filter((obj) => {
        return (
          obj.carModel !== action.payload.carModel ||
          obj.pickupDate !== action.payload.pickupDate ||
          obj.returnDate !== action.payload.returnDate
        );
      });
      state.carItems = remainItems;
    },
    updateReservation: (state, action: PayloadAction<ReservationItem>) => {
      const index = state.carItems.findIndex(
        (item) => item.carId === action.payload.carId
      );
      if (index !== -1) {
        state.carItems[index] = action.payload;
      }
    },
  },
});
export const { addReservation, removeReservation, updateReservation } =
  cartSlice.actions;
export default cartSlice.reducer;
