import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchstatus = createAsyncThunk('fetch/status', async () => {
  const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/status`); 
  return response.data;
});

const statussSlice = createSlice({
  name: 'status',
  initialState: {
    Sitems: [],
    StatusLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchstatus.pending, (state) => {
        state.StatusLoading = true;
      })
      .addCase(fetchstatus.fulfilled, (state, action) => {
        state.StatusLoading = false;
        state.Sitems = action.payload;
      })
      .addCase(fetchstatus.rejected, (state, action) => {
        state.StatusLoading = false;
        state.error = action.error.message;
      });
  },
});

export default statussSlice.reducer;
