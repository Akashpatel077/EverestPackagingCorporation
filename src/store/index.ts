import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import categoryReducer from './slices/categorySlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
