import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userslice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store; 