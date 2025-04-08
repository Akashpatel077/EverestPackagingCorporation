import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getProducts, getAllProducts} from '../../services/wooCommerceApi';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  images: {src: string}[];
  // Add other product fields as needed
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (categoryId: number) => {
    const products = await getProducts(categoryId);
    console.log("products API",products);
    
    return products;
  },
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const products = await getAllProducts();
    return products;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchAllProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch all products';
      });
  },
});

export default productsSlice.reducer;
