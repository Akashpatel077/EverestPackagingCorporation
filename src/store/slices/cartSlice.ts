import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface CartItem {
  id: number;
  name: string;
  price: string;
  sale_price?: string;
  quantity: number;
  color?: string;
  attributes?: Array<{}>;
  image?: string;
  totalPrice: number;
  product_step: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id,
      );

      if (existingIndex !== -1) {
        state.items[existingIndex] = {
          ...action.payload,
          totalPrice:
            Number(state.items[existingIndex].totalPrice) +
            Number(action.payload.totalPrice),
          quantity:
            state.items[existingIndex].quantity + action.payload.quantity,
        };
      } else {
        state.items.push({...action.payload});
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{id: number; quantity: number; totalPrice: number}>,
    ) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = action.payload.totalPrice;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const {addToCart, updateQuantity, removeFromCart, clearCart} =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => {
    const price = item.sale_price || item.price;
    return total + Number(price) * item.quantity;
  }, 0);

export default cartSlice.reducer;
