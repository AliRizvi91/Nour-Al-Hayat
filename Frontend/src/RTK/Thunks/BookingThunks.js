import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

//------ getAllBooking ------
export const getAllBooking = createAsyncThunk(
    'Booking/getAll',
    async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/booking`);
        return response.data;
      } catch (error) {
        console.error("Get All Booking Error", error);
        throw error;
      }
    }
  );
//------ postBooking ------
export const postBooking = createAsyncThunk(
    'Booking/post',
    async ({ formData }) => {
      console.log("PostBooking",formData);
      
      try {
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/booking`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // This is important for file uploads
          },
        });
        return response.data;
      } catch (error) {
        console.error("Post Booking Error", error);
        throw error;
      }
    }
  );


//------ postBooking ------
export const DeleteBooking = createAsyncThunk(
    'Booking/delete',
    async ({_id}) => {
      try {
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/booking/${_id}`);
        if(response.status===200){
          toast.success('Deleted Booking Successfully');
        }
        return response.data;
      } catch (error) {
        console.error("Post Booking Error", error);
        throw error;
      }
    }
  );


  //------ Thunk to update a Booking ------
  export const updateBooking = createAsyncThunk(
    '/updateBooking',
    async ({ Id, formData }, { rejectWithValue }) => {
        try {
            // // Log the form data for debugging
            console.log("FormData contents Thunk:");
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/booking/${Id}`,formData
            );
            return response.data; // Return the updated Booking data
        } catch (error) {
            console.error('Error Booking Thunk:', error);
            return rejectWithValue(error.response?.data || 'An error occurred while updating the Booking.');
        }
    }
);

  