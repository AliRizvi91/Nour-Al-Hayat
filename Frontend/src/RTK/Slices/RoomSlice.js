import { createSlice } from '@reduxjs/toolkit';
import { getAllRoom,postRoom,DeleteRoom,updateRoom } from "../Thunks/RoomThunks";



// Load initial state from localStorage
const loadInitialState = () => {
  const storedRooms = localStorage.getItem('bookRooms');
  return storedRooms ? JSON.parse(storedRooms) : [];
};



const initialState = {
  bookRooms: loadInitialState(), 
  rooms: [],
  totalQuantity: loadInitialState().length,
  totalPrice: loadInitialState().reduce((total, room) => total + Number(room.price), 0),
  loading: false,
  error: null,
};

const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    removeAllBookRooms: (state) => {
      state.bookRooms = []; // Clear the bookRooms array
      state.totalQuantity = 0; // Reset totalQuantity
      state.totalPrice = 0; // Reset totalPrice
      localStorage.removeItem('bookRooms'); // Clear the localStorage
    },
    addRoom: (state, action) => {
      state.bookRooms.push(action.payload);
      state.totalQuantity += 1;
      state.totalPrice += Number(action.payload.price);
      // Update localStorage
      localStorage.setItem('bookRooms', JSON.stringify(state.bookRooms));
    },
    deleteRoom: (state, action) => {
      const roomToDelete = state.bookRooms.find(item => item.Id === action.payload.Id);
      if (roomToDelete) {
        state.bookRooms = state.bookRooms.filter(item => item.Id !== action.payload.Id);
        state.totalQuantity -= 1; 
        state.totalPrice -= Number(roomToDelete.price);
        // Update localStorage
        localStorage.setItem('bookRooms', JSON.stringify(state.bookRooms));
      }
    },
  },
  extraReducers: (builder) => {
    builder
    // getAllRoom
      .addCase(getAllRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(getAllRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // postRoom
      .addCase(postRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRoom.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload
        state.rooms.push(data);
      })
      .addCase(postRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // DeleteRoom
      .addCase(DeleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter((room)=> room._id !== action.payload._id)
      })
      .addCase(DeleteRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // updateRoom
      
      .addCase(updateRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        console.log("updateRoom",action.payload);
        
        state.loading = false;
        state.rooms = state.rooms.map(Room =>
          Room._id === action.payload._id ? action.payload : Room
        );
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const { addRoom, deleteRoom ,removeAllBookRooms } = RoomSlice.actions;
export default RoomSlice.reducer;
