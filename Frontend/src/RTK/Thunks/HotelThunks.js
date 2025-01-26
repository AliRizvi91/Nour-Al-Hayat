import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

//------ getAllHotel ------
export const getAllHotel = createAsyncThunk(
    'Hotel/getAll',
    async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ARZ/hotel`);
        
        return response.data;
      } catch (error) {
        console.error("Get All Hotel Error", error);
        throw error;
      }
    }
  );