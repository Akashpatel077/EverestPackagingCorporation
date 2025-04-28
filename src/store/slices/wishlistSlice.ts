import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface WishlistState {
  items: any[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<any>) => {
      state.items.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetWishList: state => {
      state.items = [];
    },
  },
});

export const {addToWishlist, removeFromWishlist, resetWishList} =
  wishlistSlice.actions;

export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const isProductInWishlist = (state: RootState, productId: number) =>
  state.wishlist.items.some(item => item.id === productId);

export default wishlistSlice.reducer;
