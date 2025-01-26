import { createSlice } from '@reduxjs/toolkit';
import { postMessage, getAllMessages} from "../Thunks/MessageThunks";


const MessagesSlice = createSlice({
  name: 'Messages',
  initialState: {
    MessageItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // getAllMessageOfSender
      .addCase(getAllMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.MessageItems = action.payload;
      })
      .addCase(getAllMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // postMessage
      .addCase(postMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload
        state.MessageItems.push(data);
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default MessagesSlice.reducer;
