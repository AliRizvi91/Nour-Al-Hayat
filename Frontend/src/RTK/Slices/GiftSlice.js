import { createSlice } from '@reduxjs/toolkit';
import { getAllGift,postGift,DeleteGift,updateGift } from "../Thunks/GifDataThunks";

// Helper function to load state from local storage
const loadStateFromLocalStorage = () => {
  try {
    const savedState = localStorage.getItem('giftsState');
    if (savedState) {
      return JSON.parse(savedState); // Parse the saved state from local storage
    }
  } catch (error) {
    console.error('Error loading state from localStorage', error);
  }
  return {
    Gift: [],
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    error: null,
  };
};

// Helper function to save state to local storage
const saveStateToLocalStorage = (state) => {
  try {
    localStorage.setItem('giftsState', JSON.stringify(state)); // Save the state to local storage
  } catch (error) {
    console.error('Error saving state to localStorage', error);
  }
};



const GiftsSlice = createSlice({
  name: 'gifts',
  initialState: loadStateFromLocalStorage(),
  reducers: {
    addGift: (state, action) => {
      state.Gift.push(action.payload);
      state.totalQuantity += 1;
      state.totalPrice += action.payload.price;
      saveStateToLocalStorage(state);
    },
    minusGift: (state, action) => {
      const index = state.Gift.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.totalQuantity -= 1;
        state.totalPrice -= state.Gift[index].price;
        if (state.Gift[index].quantity > 1) {
          state.Gift[index].quantity -= 1;
        } else {
          state.Gift.splice(index, 1);
        }
        saveStateToLocalStorage(state);
      }
    },
    clearAllGift: (state) => {
      state.Gift = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveStateToLocalStorage(state);
    },
    deleteGift: (state, action) => {
      state.Gift = state.Gift.filter(item => item.id !== action.payload);
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveStateToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    // Handle the getAllGift action
    builder
      .addCase(getAllGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllGift.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getAllGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      

      // Handle the postGift action
      .addCase(postGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(postGift.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(postGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle the DeleteGift action
      .addCase(DeleteGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(DeleteGift.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(gift => gift._id !== action.payload._id);
      })
      .addCase(DeleteGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle the updateGift action
      .addCase(updateGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateGift.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map(gift =>
          gift._id === action.payload._id ? action.payload : gift
        );
      })
      .addCase(updateGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addGift, deleteGift, minusGift, clearAllGift } = GiftsSlice.actions;
export default GiftsSlice.reducer;
