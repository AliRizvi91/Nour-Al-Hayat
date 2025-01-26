import { createSlice } from "@reduxjs/toolkit";
import {getAllHotel} from "../Thunks/HotelThunks";

// Define initial state
const initialState = {
  hotel: null,
  loading: false,
  error: null,
};

// Create hotel slice
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotel = action.payload[0];
      })
      .addCase(getAllHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});
// export const {  } = hotelSlice.actions;

export default hotelSlice.reducer;
