import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for ScrollArea
const initialState = {
  top: 0,
  normalizedTop: 0,
  threshold: 9,
  mouse: [0, 0],
};

// Create the scrollSlice
const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    // Action to set the 'top' value
    setTop(state, action) {
      state.top = action.payload;
    },
    setNormalizedTop(state, action) {
      state.normalizedTop = action.payload;
    },
    // Action to set the 'threshold' value
    setThreshold(state, action) {
      state.threshold = action.payload;
    },
    // Action to set the 'mouse' coordinates
    setMouse(state, action) {
      state.mouse = action.payload;
    },
    // Action to reset the ScrollArea state to initial values
    resetScrollArea(state) {
      state.top = initialState.top;
      state.threshold = initialState.threshold;
      state.mouse = initialState.mouse;
    },
  },
});

// Export actions
export const { setTop, setNormalizedTop, setThreshold, setMouse, resetScrollArea } =
  scrollSlice.actions;

// Export selectors

// Selector to get the 'top' value
export const selectScrollTop = (state) => state.scroll.top;

export const selectScrollNormalizedTop = (state) => state.scroll.normalizedTop;

// Selector to get the 'threshold' value
export const selectThreshold = (state) => state.scroll.threshold;

// Selector to get the 'mouse' coordinates
export const selectMouse = (state) => state.scroll.mouse;

// Selector to get the entire ScrollArea state (optional)
export const selectScrollArea = (state) => state.scroll;

// Export the reducer to be included in the store
export default scrollSlice.reducer;
