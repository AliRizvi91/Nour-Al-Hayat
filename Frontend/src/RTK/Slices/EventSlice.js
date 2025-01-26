import { createSlice } from '@reduxjs/toolkit';
import { postEvent, getAllEvent, DeleteEvent, updateEvent } from "../Thunks/EventThunks";


const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    eventItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.eventItems = action.payload;
      })
      .addCase(getAllEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // postevent
      .addCase(postEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEvent.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload
        state.eventItems.push(data);
      })
      .addCase(postEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // DeleteEvent
      .addCase(DeleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.eventItems = state.eventItems.filter((event)=> event._id !== action.payload._id)
      })
      .addCase(DeleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // updateEvent
      
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        console.log("updateEvent",action.payload);
        
        state.loading = false;
        state.eventItems = state.eventItems.map(event =>
          event._id === action.payload._id ? action.payload : event
        );
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default eventsSlice.reducer;
