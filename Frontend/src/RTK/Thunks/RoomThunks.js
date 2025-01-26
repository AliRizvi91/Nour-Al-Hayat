import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

//------ getAllRoom ------
export const getAllRoom = createAsyncThunk(
    'room/getAll',
    async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/room`);
        return response.data;
      } catch (error) {
        console.error("Get All Room Error", error);
        throw error;
      }
    }
  );
//------ postRoom ------
export const postRoom = createAsyncThunk(
    'room/post',
    async ({ formData }) => {
      try {
  
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/room`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // This is important for file uploads
          },
        });
        return response.data;
      } catch (error) {
        console.error("Post Room Error", error);
        throw error;
      }
    }
  );


//------ postRoom ------
export const DeleteRoom = createAsyncThunk(
    'room/delete',
    async ({_id}) => {
      try {
        
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/room/${_id}`);
        if(response.status===200){
          toast.success('Deleted Room Successfully');
        }
        return response.data;
      } catch (error) {
        console.error("Post Room Error", error);
        throw error;
      }
    }
  );


  //------ Thunk to update a Room ------
  export const updateRoom = createAsyncThunk(
    '/updateRoom',
    async ({ Id, formData }, { rejectWithValue }) => {
        try {
            // // Log the form data for debugging
            // console.log("FormData contents:");
            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });

            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/room/${Id}`,formData
            );

            return response.data; // Return the updated room data
        } catch (error) {
            console.error('Error Room Thunk:', error);
            return rejectWithValue(error.response?.data || 'An error occurred while updating the room.');
        }
    }
);

  