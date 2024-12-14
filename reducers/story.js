import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const storySlice = createSlice({
    name: "story",
    initialState,
    reducers: {
        addStory: (state, action) => {
            state.value.push(action.payload);
        },
        deleteStory: (state, action) => {
            state.value = state.value.filter(story => story.id !== action.payload); // comparaison par id de chaque story
        },
    },
});

export const { addStory, deleteStory } = storySlice.actions;
export default storySlice.reducer;
// reducer bien ajouté au App.js