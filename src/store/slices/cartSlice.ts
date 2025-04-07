import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface CartItem {
  id: number;
  name: string;
  price: string;
  sale_price?: string;
  quantity: number;
  color?: string;
  attributes?: Array<{
    name: string;
    value: string;
  }>;
  image?: string;
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
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && 
        item.color === action.payload.color &&
        JSON.stringify(item.attributes) === JSON.stringify(action.payload.attributes)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => 
  state.cart.items.reduce((total, item) => {
    const price = item.sale_price || item.price;
    return total + (Number(price) * item.quantity);
  }, 0);

export default cartSlice.reducer;