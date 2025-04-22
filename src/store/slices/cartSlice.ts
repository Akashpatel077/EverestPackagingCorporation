import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';
import {
  addToCartProducts,
  getCartItems,
  removeFromCart,
  updateProductInCart,
} from 'src/services/wooCommerceApi';

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
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  isSuccess: false,
};

export const addToCartAction = createAsyncThunk(
  'products/addToCartAction',
  async ({
    productId,
    quantity,
    variation,
  }: {
    productId: number;
    quantity: number;
    variation: {};
  }) => {
    const cart = await addToCartProducts(productId, quantity, variation);
    return cart;
  },
);

export const getCartListAction = createAsyncThunk(
  'products/getCartListAction',
  async () => {
    const cart = await getCartItems();
    return cart.data;
  },
);

export const removeFromCartAction = createAsyncThunk(
  'products/removeFromCartAction',
  async ({productKey}: {productKey: string}) => {
    const cart = await removeFromCart(productKey);
    return cart;
  },
);

export const updateProductInCartAction = createAsyncThunk(
  'products/updateProductInCartAction',
  async ({productKey, quantity}: {productKey: string; quantity: number}) => {
    const cart = await updateProductInCart(productKey, quantity);
    return cart;
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetFlags: state => {
      state.isSuccess = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addToCartAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = {...action.payload};
        state.isSuccess = true;
      })
      .addCase(addToCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(removeFromCartAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = {...action.payload};
        state.isSuccess = true;
      })
      .addCase(removeFromCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(updateProductInCartAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductInCartAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = {...action.payload};
        state.isSuccess = true;
      })
      .addCase(updateProductInCartAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(getCartListAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartListAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = {...action.payload};
        state.isSuccess = true;
      })
      .addCase(getCartListAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => {
    const price = item.sale_price || item.price;
    return total + Number(price) * item.quantity;
  }, 0);

export const {resetFlags} = cartSlice.actions;

export default cartSlice.reducer;
