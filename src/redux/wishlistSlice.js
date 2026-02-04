// wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const initialState = {
  items: savedWishlist,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
