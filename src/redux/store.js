import { configureStore } from '@reduxjs/toolkit';
import threeReducer from './threeSlice';

const store = configureStore({
  reducer: {
    three: threeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

export default store;