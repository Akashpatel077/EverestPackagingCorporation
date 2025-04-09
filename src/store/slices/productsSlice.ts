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
  paginationLoading: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  hasMore: true,
  paginationLoading: true,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({
    categoryId,
    currentPage = 1,
  }: {
    categoryId: number;
    currentPage?: number;
  }) => {
    const products = await getProducts(categoryId, currentPage);

    return {products, currentPage};
  },
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const products = await getAllProducts();
    return products;
  },
);

const PAGE_SIZE = 10;

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        const {currentPage} = action.meta.arg;

        if (currentPage === 1) {
          state.loading = true;
        } else {
          state.paginationLoading = true;
        }
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const {
          products,
          currentPage,
        }: {products: Product[]; currentPage: number} = action.payload;

        if (currentPage === 1) {
          state.items = products;
        } else {
          state.items = [...state.items, ...products];
        }

        state.hasMore = products.length === PAGE_SIZE;
        state.loading = false;
        state.paginationLoading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.paginationLoading = false;
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
