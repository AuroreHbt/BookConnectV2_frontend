import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: null, email: null, token: null, _id: null, avatar: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload, avatar: action.payload.avatar || "" }; // Simplification de l'affectation
    },
    logout: (state) => {
      state.value = { username: null, email: null, token: null, _id: null, avatar: "" }; // Reset complet
    },
    updateAvatar: (state, action) => {
      state.value.avatar = action.payload; // Mise à jour de l'avatar
      console.log("Nouvel avatar:", action.payload); // Log propre
    },    
  },
});

export const { login, logout, updateAvatar } = userSlice.actions;
export default userSlice.reducer;
