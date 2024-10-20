import { configureStore } from '@reduxjs/toolkit';
import threeReducer from './threeSlice';
import scrollReducer from './scrollSlice';

const store = configureStore({
  reducer: {
    three: threeReducer,
    scroll: scrollReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

export default store;