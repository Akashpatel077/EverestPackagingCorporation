import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import wooCommerceApi from '../../services/wooCommerceApi';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  display: string;
  image: any;
  menu_order: number;
  count: number;
  subCategories?: Category[];
  isExpanded?: boolean;
}

export interface CategoryState {
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const organizeCategories = (categories: Category[]): Category[] => {
  const categoryMap = new Map<number, Category>();
  const rootCategories: Category[] = [];

  // First pass: map all categories by ID
  categories.forEach(category => {
    categoryMap.set(category.id, {
      ...category,
      subCategories: [],
      isExpanded: false,
    });
  });

  // Second pass: organize into hierarchy
  categories.forEach(category => {
    const categoryWithSubs = categoryMap.get(category.id)!;
    if (category.parent === 0) {
      rootCategories.push(categoryWithSubs);
    } else {
      const parentCategory = categoryMap.get(category.parent);
      if (parentCategory) {
        parentCategory.subCategories?.push(categoryWithSubs);
      }
    }
  });

  return rootCategories;
};

const initialState: CategoryState = {
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const data = await wooCommerceApi.getCategories();
      return data;
    } catch (error: any) {
      throw error.response?.data?.message || error.message;
    }
  },
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = organizeCategories(action.payload);
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch categories';
      });
  },
});

export default categorySlice.reducer;
