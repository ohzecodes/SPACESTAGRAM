// store.js
import { configureStore, createsyncThunk } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Redux Thunk middleware
import Reducer from './reducers/Reducer'; // Import your root reducer


// Configure the store with Redux Toolkit and Thunk middleware
const store = configureStore({
  reducer: Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk), // Add Redux Thunk middleware
});

export default store;
