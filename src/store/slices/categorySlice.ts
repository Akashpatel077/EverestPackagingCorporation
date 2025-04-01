import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import wooCommerceApi, {getSubCategories} from '../../services/wooCommerceApi';

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
  subCategoriesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
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
  subCategoriesStatus: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    try {
      const data = await wooCommerceApi.getCategories({
        per_page: 50,
        parent: 0,
      });
      console.log('data', data);

      return data;
    } catch (error: any) {
      throw error.response?.data?.message || error.message;
    }
  },
);

export const fetchSubCategories = createAsyncThunk(
  'categories/fetchSubCategories',
  async (parentId: number) => {
    try {
      const data = await getSubCategories(parentId);
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
      })
      .addCase(fetchSubCategories.pending, state => {
        state.subCategoriesStatus = 'loading';
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.subCategoriesStatus = 'succeeded';
        const parentCategory = state.categories.find(
          cat => cat.id === action.meta.arg,
        );
        if (parentCategory) {
          parentCategory.subCategories = action.payload;
          parentCategory.isExpanded = true;
        }
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.subCategoriesStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch subcategories';
      });
  },
});

export default categorySlice.reducer;
