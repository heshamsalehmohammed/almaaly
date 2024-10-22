// src/store/threeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  viewport: null,
  size: null,
  camera: null,
};

const threeSlice = createSlice({
  name: 'three',
  initialState,
  reducers: {
    setViewport(state, action) {
      state.viewport = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setCamera(state, action) {
      state.camera = action.payload;
    },
    setThreeData(state, action) {
      const { viewport, size, camera } = action.payload;
      state.viewport = viewport;
      state.size = size;
      state.camera = camera;
    },
  },
});

export const { setViewport, setSize, setCamera, setThreeData } = threeSlice.actions;


// Export selectors


export const selectThreeViewport = (state) => state.three.viewport;
export const selectThreeSize = (state) => state.three.size;
export const selectThreeCamera = (state) => state.three.camera;


export default threeSlice.reducer;