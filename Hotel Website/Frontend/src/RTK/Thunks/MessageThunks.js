import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { toast } from 'react-toastify';

//------ getAllMessage ------
export const getAllMessages = createAsyncThunk('getSender/Message',
    async () => {
      try {
        const response = await axios.get(`http://localhost:4500/api/ARZ/message`);
        return response.data;
      } catch (error) {
        console.error("Get All Message Error", error);
        throw error;
      }
    }
  );
//------ postMessage ------
export const postMessage = createAsyncThunk(
    'Message/post',
    async (Data) => {
      // console.log(" Post FormData contents  Thunk:");
      // Data.forEach((value, key) => {
      //     console.log(`${key}: ${value}`);
      // });
      
      try {
        // Ensure the request is sent with the correct content-type for form data
        const response = await axios.post('http://localhost:4500/api/ARZ/message', Data);
        if(response.status===200){
          toast.success('Post Successfully')
        }
        return response.data;
      } catch (error) {
        console.error("Post Message Error", error);
        toast.error('Post is not Successfully')
        throw error;
      }
    }
  );


  