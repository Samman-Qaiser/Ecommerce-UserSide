import { createSlice } from "@reduxjs/toolkit";

// 1️⃣ LocalStorage se pehle se saved cart items fetch karo
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  items: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      // 2️⃣ Update localStorage
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    increaseQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decreaseQty(state, action) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
