import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  loginUserApi,
  fetchUserProfileApi,
  fetchUserDetails,
  fetchUserProfileDetails,
} from '../../services/wooCommerceApi';
import {addBillingAddress, addShippingAddress} from './addressSlice';

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    {username, password}: {username: string; password: string},
    thunkAPI,
  ) => {
    try {
      const data = await loginUserApi(username, password);
      const userProfile = await fetchUserProfileApi(data.token);
      const userDetails = await fetchUserDetails(userProfile.id, data.token);

      // Dispatch billing address
      if (userDetails?.billing) {
        const billingAddress = {
          id: Date.now().toString(),
          name: `${userDetails.billing.first_name} ${userDetails.billing.last_name}`,
          street: userDetails.billing.address_1,
          city: userDetails.billing.city,
          state: userDetails.billing.state,
          postcode: userDetails.billing.postcode,
          country: userDetails.billing.country,
          phone: userDetails.billing.phone,
          isDefault: true,
        };
        thunkAPI.dispatch(addBillingAddress(billingAddress));
      }

      // Dispatch shipping address
      if (userDetails?.shipping) {
        const shippingAddress = {
          id: Date.now().toString(),
          name: `${userDetails.shipping.first_name} ${userDetails.shipping.last_name}`,
          street: userDetails.shipping.address_1,
          city: userDetails.shipping.city,
          state: userDetails.shipping.state,
          postcode: userDetails.shipping.postcode,
          country: userDetails.shipping.country,
          phone: userDetails.billing?.phone || '',
          isDefault: true,
        };
        thunkAPI.dispatch(addShippingAddress(shippingAddress));
      }

      return {token: data.token, user: userDetails};
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({token}: {token: string}) => {
    try {
      const userProfile = await fetchUserProfileDetails(token);

      return userProfile;
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch profile';
    }
  },
);

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (token: string) => {
    try {
      return await fetchUserProfileApi(token);
    } catch (error: any) {
      throw error.response?.data?.message || 'Failed to fetch profile';
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
      state.user = null;
      state.error = null;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profile';
      })
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to update profile';
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
