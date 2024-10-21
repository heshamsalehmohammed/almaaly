import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for ScrollArea
const initialState = {
  
};

// Create the animationTriggerSlice
const animationTriggerSlice = createSlice({
  name: "animationTrigger",
  initialState,
  reducers: {
    // Action to set the 'top' value
    setTop(state, action) {
      state.top = action.payload;
    },

  },
});

// Export actions
export const { setTop } =
  animationTriggerSlice.actions;

// Export selectors

// Selector to get the 'top' value
export const selectScrollTop = (state) => state.scroll.top;

// Export the reducer to be included in the store
export default animationTriggerSlice.reducer;
