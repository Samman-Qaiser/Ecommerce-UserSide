import { createSlice } from "@reduxjs/toolkit";

// Helper function to load state from localStorage
const loadAuthFromStorage = () => {
  try {
    const savedAuth = localStorage.getItem("authState");
    if (savedAuth) {
      const parsed = JSON.parse(savedAuth);
      console.log("📦 Loading auth from localStorage:", parsed);
      return parsed;
    }
  } catch (error) {
    console.error("Error loading auth from localStorage:", error);
  }
  return {
    user: null,
    isAuthenticated: false,
    isGuest: false,
  };
};

// Helper function to save state to localStorage
const saveAuthToStorage = (state) => {
  try {
    const authData = {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
      isGuest: state.isGuest,
    };
    localStorage.setItem("authState", JSON.stringify(authData));
    console.log("💾 Saved auth to localStorage:", authData);
  } catch (error) {
    console.error("Error saving auth to localStorage:", error);
  }
};

const initialState = loadAuthFromStorage();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      console.log("✅ loginSuccess called with:", action.payload);
      state.user = action.payload.user || action.payload;
      state.isAuthenticated = true;
      state.isGuest = false;
      saveAuthToStorage(state);
    },
    
    setGuestUser(state, action) {
      console.log("👤 setGuestUser called with:", action.payload);
      state.user = action.payload.user || action.payload;
      state.isAuthenticated = false;
      state.isGuest = true;
      saveAuthToStorage(state);
    },
    
    logout(state) {
      console.log("🚪 logout called");
      state.user = null;
      state.isAuthenticated = false;
      state.isGuest = false;
      // Clear everything
      localStorage.removeItem("authState");
      localStorage.removeItem("guestUserId");
    },
    
    updateUser(state, action) {
      if (state.user) {
        console.log("🔄 updateUser called with:", action.payload);
        state.user = { ...state.user, ...action.payload };
        saveAuthToStorage(state);
      }
    },
  },
});

export const { loginSuccess, setGuestUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;