import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

//------ getAllGift ------
export const getAllGift = createAsyncThunk(
    'Gift/getAll',
    async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/giftcard`);
        return response.data;
      } catch (error) {
        console.error("Get All Gift Error", error);
        throw error;
      }
    }
  );
//------ postGift ------
export const postGift = createAsyncThunk(
    'Gift/post',
    async ({ formData }) => {
      // // Log the form data for debugging
            console.log("FormData contents:");
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
      
      try {
  
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/giftcard`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // This is important for file uploads
          },
        });
        return response.data;
      } catch (error) {
        console.error("Post Gift Error", error);
        throw error;
      }
    }
  );


//------ postGift ------
export const DeleteGift = createAsyncThunk(
    'Gift/delete',
    async ({_id}) => {
      try {
        
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/giftcard/${_id}`);
        if(response.status===200){
          toast.success('Deleted Gift Successfully');
        }
        return response.data;
      } catch (error) {
        console.error("Post Gift Error", error);
        throw error;
      }
    }
  );


  //------ Thunk to update a Gift ------
  export const updateGift = createAsyncThunk(
    '/updateGift',
    async ({ Id, formData }, { rejectWithValue }) => {
      console.log("formData",formData);
        try {
            // // Log the form data for debugging
            // console.log("FormData contents:");
            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });
            

            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/giftcard/${Id}`,formData
            );

            return response.data; // Return the updated Gift data
        } catch (error) {
            console.error('Error Gift Thunk:', error);
            return rejectWithValue(error.response?.data || 'An error occurred while updating the Gift.');
        }
    }
);



  