import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'products',
    'categories',
    'productDetails',
    'wishlist',
    'address',
    'cart',
    'auth',
    'startKey',
  ],
};

export const createPersistedReducer = (rootReducer: any) => {
  return persistReducer(persistConfig, rootReducer);
};
