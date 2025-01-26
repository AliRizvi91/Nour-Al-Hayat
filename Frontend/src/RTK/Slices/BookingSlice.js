import { createSlice } from '@reduxjs/toolkit';
import { getAllBooking,DeleteBooking } from "../Thunks/BookingThunks";


const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    Bookingitems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.Bookingitems = action.payload;
      })
      .addCase(getAllBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // DeleteBooking
      .addCase(DeleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.Bookingitems = state.Bookingitems.filter((Booking)=> Booking._id !== action.payload._id)
      })
      .addCase(DeleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default bookingSlice.reducer;
