import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getOrders} from '../../services/wooCommerceApi';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: {src: string}[];
}

interface ProductsState {
  orders: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk(
  'products/fetchOrders',
  async ({id}: {id: number}) => {
    const orders = await getOrders(id);
    return orders;
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all products';
      });
  },
});

export default ordersSlice.reducer;
