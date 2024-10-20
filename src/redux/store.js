import { configureStore } from '@reduxjs/toolkit';
import threeReducer from './threeSlice';

const store = configureStore({
  reducer: {
    three: threeReducer,
    // Add other reducers here if needed
  },
});

export default store;