import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './authApi';
import foodCartReducer from '../Features/foot-cart/slice/foodSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    foodCart: foodCartReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(apiSlice.middleware),
  devTools: true,
});
