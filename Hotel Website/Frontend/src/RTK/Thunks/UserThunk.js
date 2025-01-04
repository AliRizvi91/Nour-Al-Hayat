import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast

// getAllUsers
export const getAllUsers = createAsyncThunk("Users/All", async () => {
  const response = await axios.get("http://localhost:4500/api/ARZ/user");
  return response.data;
});

//------ Login ------
export const login = createAsyncThunk("login/User", async (data) => {
  const response = await axios.post("http://localhost:4500/api/ARZ/user/login", data);
  return response.data;
});

export const signup = createAsyncThunk("signup/User", async (formData) => {
  try {
    const response = await axios.post("http://localhost:4500/api/ARZ/user/signup", formData);
    return response.data; // Assuming response.data is the expected data on success
  } catch (error) {
    console.error('Error while signing up:', error);
    throw error; // Rethrow the error to be caught elsewhere if necessary
  }
});


export const getme = createAsyncThunk("getme/User", async () => {
    const response = await axios.get("http://localhost:4500/api/ARZ/user/profile", {
        headers: {
            authorization : `Bearer ${localStorage.getItem("token")}`
        }
    });
    return response.data;
  });


  export const userUpdate = createAsyncThunk("Update/User", async ({ id,formData}, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4500/api/ARZ/user/${id}`, formData)
      // console.log("response.status",typeof(response.status));
      
      if (response.status === 200) {
        const success = new Audio('/assets/sounds/success.mp3');
        success.play();
        toast.success('Updated successfully');
      } else {
        const error = new Audio('/assets/sounds/error.mp3');
        error.play();
        toast.error('Failed to Update');
      }
      return response.data; // Assuming response.data is the expected data on success
    } catch (error) {
      console.error('Error Thunk:', error);
      return rejectWithValue(error.response?.data || 'An error occurred while updating the user.');
    }
  });

  

