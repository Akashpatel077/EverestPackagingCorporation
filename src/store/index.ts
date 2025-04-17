import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import categoryReducer from './slices/categorySlice';
import productDetailsReducer from './slices/productDetailsSlice';
import wishlistReducer from './slices/wishlistSlice';
import addressReducer from './slices/addressSlice';
import cartReducer from './slices/cartSlice';
import startKeyReducer from './slices/startKeySlice';
import authReducer from './slices/authSlice';
import { persistStore } from 'redux-persist';
import { createPersistedReducer } from './persistConfig';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  products: productsReducer,
  categories: categoryReducer,
  productDetails: productDetailsReducer,
  wishlist: wishlistReducer,
  address: addressReducer,
  cart: cartReducer,
  startKey: startKeyReducer,
  auth: authReducer,
});

const persistedReducer = createPersistedReducer(rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
