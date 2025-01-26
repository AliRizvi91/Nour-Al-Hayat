import { createSlice } from '@reduxjs/toolkit';
import { getAllFeedbacks, postFeedback } from "../Thunks/FeedbackThunk";

const initialState = {
  Feedbacks: [],
  OurFeedbacks:[],
  loading: false,
  error: null,
};

const FeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
   ActionOurFeedbacks(state,action){
    const {userId} = action.payload
    state.OurFeedbacks= state.Feedbacks.filter((feed)=> feed.userId?._id === userId)
  },
},
  extraReducers: (builder) => {
    builder
      // getAllFeedbacks
      .addCase(getAllFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.Feedbacks = action.payload;
      })
      .addCase(getAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // postFeedback
      .addCase(postFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFeedback.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        state.Feedbacks.push(data);
      })
      .addCase(postFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
 export const {ActionOurFeedbacks} = FeedbackSlice.actions
export default FeedbackSlice.reducer;
