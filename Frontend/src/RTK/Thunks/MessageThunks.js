import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// ------ getAllMessage ------

export const getAllMessages = createAsyncThunk('getSender/Message', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/message`);
    console.log("resultMessage", response.data);
    return response.data;
  } catch (error) {
    console.error("Get All Message Error", error);
    throw error;
  }
});

// ------ postMessage ------

export const postMessage = createAsyncThunk('Message/post', async (Data) => {
  try {
    // Ensure the request is sent with the correct content-type for form data
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/message`, Data);
    if (response.status === 200) {
      toast.success('Post Successfully');
    }
    return response.data;
  } catch (error) {
    console.error("Post Message Error", error);
    toast.error('Post is not Successful');
    throw error;
  }
});
