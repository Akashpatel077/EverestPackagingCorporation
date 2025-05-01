import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  loginUserApi,
  fetchUserProfileApi,
  fetchUserDetails,
} from '../../services/wooCommerceApi';

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
  async ({username, password}: {username: string; password: string}) => {
    try {
      const data = await loginUserApi(username, password);
      // After successful login, fetch user profile
      const userProfile = await fetchUserProfileApi(data.token);

      const userDetails = await fetchUserDetails(userProfile.id, data.token);

      return {token: data.token, user: userDetails};
    } catch (error: any) {
      throw error.response?.data || 'Login failed';
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
        state.error = action.error || 'Login failed';
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
      });
  },
});

export const {logout, clearError} = authSlice.actions;
export default authSlice.reducer;
