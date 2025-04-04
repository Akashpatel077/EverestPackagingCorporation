import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getProductDetails} from '../../services/wooCommerceApi';

interface ProductDetails {
  regular_price: any;
  sale_price: any;
  id: number;
  name: string;
  price: string;
  description: string;
  images: {src: string}[];
  attributes: {options: string[]; name: string}[];
  average_rating: string;
  wcpa_form_fields?: {
    fields: Array<{
      type: string;
      values: Array<{
        value: string;
        color: string;
        selected?: boolean;
      }>;
    }>;
  };
}

interface ProductsState {
  productDetails: ProductDetails;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  productDetails: {
    id: 0,
    name: '',
    price: '',
    description: '',
    images: [],
    attributes: [],
    average_rating: '',
  },
  loading: false,
  error: null,
};

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId: number) => {
    const products = await getProductDetails(productId);
    return products;
  },
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productDetailsSlice.reducer;
