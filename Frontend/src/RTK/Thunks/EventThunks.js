import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

//------ getAllEvent ------
export const getAllEvent = createAsyncThunk(
    'Event/getAll',
    async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/event`);
        return response.data;
      } catch (error) {
        console.error("Get All Event Error", error);
        throw error;
      }
    }
  );
//------ postEvent ------
export const postEvent = createAsyncThunk(
    'Event/post',
    async ({ formData }) => {
      console.log("PostEvent",formData);
      
      try {
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/event`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // This is important for file uploads
          },
        });
        return response.data;
      } catch (error) {
        console.error("Post Event Error", error);
        throw error;
      }
    }
  );


//------ postEvent ------
export const DeleteEvent = createAsyncThunk(
    'Event/delete',
    async ({_id}) => {
      try {
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/event/${_id}`);
        if(response.status===200){
          toast.success('Deleted Event Successfully');
        }
        return response.data;
      } catch (error) {
        console.error("Post Event Error", error);
        throw error;
      }
    }
  );


  //------ Thunk to update a Event ------
  export const updateEvent = createAsyncThunk(
    '/updateEvent',
    async ({ Id, formData }, { rejectWithValue }) => {
        try {
            // // Log the form data for debugging
            console.log("FormData contents Thunk:");
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/event/${Id}`,formData
            );
            return response.data; // Return the updated Event data
        } catch (error) {
            console.error('Error Event Thunk:', error);
            return rejectWithValue(error.response?.data || 'An error occurred while updating the Event.');
        }
    }
);

  