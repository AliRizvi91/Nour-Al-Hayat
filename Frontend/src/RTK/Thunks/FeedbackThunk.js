import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast

//------ getAllFeedback ------
export const getAllFeedbacks = createAsyncThunk(
    'feedback/getAll',
    async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/feedback`);
            return response.data;
        } catch (error) {
            console.error("Get All Feedback Error", error);
            throw error;
        }
    }
  );

  export const postFeedback = createAsyncThunk(
    'feedback/post',
    async (data, { rejectWithValue }) => {
      try {
        // Post the feedback to the backend API
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/feedback`, data);
        
        if (response.status === 201) {
          toast.success('Feedback Submit')
          return response.data;
        }
  
        // If for some reason the response status is not 201, handle error
        return rejectWithValue('Failed to post feedback',
          toast.error('Feedback Submit Failed')
        );
      } catch (error) {
        console.error("Error posting feedback:", error);
        return rejectWithValue(error.message);
      }
    }
  );