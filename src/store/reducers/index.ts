import {combineReducers} from '@reduxjs/toolkit';
import categoryReducer from '../slices/categorySlice';

const rootReducer = combineReducers({
  categories: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
