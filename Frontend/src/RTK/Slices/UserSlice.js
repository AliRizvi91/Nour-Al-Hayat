import { createSlice } from "@reduxjs/toolkit";
import { login, signup, getme ,userUpdate,getAllUsers} from "../Thunks/UserThunk";

// Define initial state
const initialState = {
  user: null,
  AllUsers: [],
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Remove token from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Save token to localStorage on login
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Save token to localStorage on signup
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getme.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      //----- All Users -----
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.AllUsers = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});
export const { logout } = userSlice.actions;

export default userSlice.reducer;
