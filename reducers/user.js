import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { username: null, email: null, token: null, _id: null, avatar: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload, avatar: action.payload.avatar || null }; // Assure un avatar valide
    },
    logout: (state) => {
      state.value = { username: null, email: null, token: null, _id: null, avatar: null }; // Reset propre
    },
    updateAvatar: (state, action) => {
      const avatarUrl = action.payload.uri || action.payload.avatarUrl;
      if (avatarUrl) {
        state.value.avatar = avatarUrl; // Stocke directement l'URL
        console.log("Avatar mis à jour:", state.value.avatar);
      } else {
        console.error("Format d'avatar invalide :", action.payload);
      }
    },         
  },
});

export const { login, logout, updateAvatar } = userSlice.actions;
export default userSlice.reducer;
