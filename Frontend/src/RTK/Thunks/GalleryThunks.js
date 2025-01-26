import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

//------ getAllGallery ------
export const getAllGallery = createAsyncThunk(
    'Gallery/getAll',
    async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/gallery`);
        return response.data;
      } catch (error) {
        console.error("Get All Gallery Error", error);
        throw error;
      }
    }
  );
//------ postGallery ------
export const postGallery = createAsyncThunk(
    'Gallery/post',
    async ({ formData }) => {
      // // Log the form data for debugging
            console.log("FormData contents:");
            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });
      
      try {
  
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/gallery`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // This is important for file uploads
          },
        });
        return response.data;
      } catch (error) {
        console.error("Post Gallery Error", error);
        throw error;
      }
    }
  );


//------ postGallery ------
export const DeleteGallery = createAsyncThunk(
    'Gallery/delete',
    async ({_id}) => {
      try {
        
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/gallery/${_id}`);
        if(response.status===200){
          toast.success('Deleted Gallery Successfully');
        }
        return response.data;
      } catch (error) {
        console.error("Post Gallery Error", error);
        throw error;
      }
    }
  );


  //------ Thunk to update a Gallery ------
  export const updateGallery = createAsyncThunk(
    '/updateGallery',
    async ({ Id, formData }, { rejectWithValue }) => {
      console.log("formData",formData);
        try {
            // // Log the form data for debugging
            // console.log("FormData contents:");
            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });
            

            const response = await axios.put(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/gallery/${Id}`,formData
            );

            return response.data; // Return the updated Gallery data
        } catch (error) {
            console.error('Error Gallery Thunk:', error);
            return rejectWithValue(error.response?.data || 'An error occurred while updating the Gallery.');
        }
    }
);





  