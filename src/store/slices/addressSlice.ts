import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressState {
  billingAddresses: Address[];
  shippingAddresses: Address[];
  selectedBillingAddressId: string | null;
  selectedShippingAddressId: string | null;
}

const initialState: AddressState = {
  billingAddresses: [],
  shippingAddresses: [],
  selectedBillingAddressId: null,
  selectedShippingAddressId: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addBillingAddress: (state, action: PayloadAction<Address>) => {
      if (state.billingAddresses.length === 0) {
        action.payload.isDefault = true;
        state.selectedBillingAddressId = action.payload.id;
      }
      state.billingAddresses.push(action.payload);
    },
    addShippingAddress: (state, action: PayloadAction<Address>) => {
      if (state.shippingAddresses.length === 0) {
        action.payload.isDefault = true;
        state.selectedShippingAddressId = action.payload.id;
      }
      state.shippingAddresses.push(action.payload);
    },
    updateBillingAddress: (state, action: PayloadAction<Address>) => {
      const index = state.billingAddresses.findIndex(
        address => address.id === action.payload.id,
      );
      if (index !== -1) {
        state.billingAddresses[index] = action.payload;
      }
    },
    updateShippingAddress: (state, action: PayloadAction<Address>) => {
      const index = state.shippingAddresses.findIndex(
        address => address.id === action.payload.id,
      );
      if (index !== -1) {
        state.shippingAddresses[index] = action.payload;
      }
    },
    removeBillingAddress: (state, action: PayloadAction<string>) => {
      state.billingAddresses = state.billingAddresses.filter(
        address => address.id !== action.payload,
      );
      if (state.selectedBillingAddressId === action.payload) {
        state.selectedBillingAddressId = state.billingAddresses[0]?.id || null;
      }
    },
    removeShippingAddress: (state, action: PayloadAction<string>) => {
      state.shippingAddresses = state.shippingAddresses.filter(
        address => address.id !== action.payload,
      );
      if (state.selectedShippingAddressId === action.payload) {
        state.selectedShippingAddressId =
          state.shippingAddresses[0]?.id || null;
      }
    },
    setSelectedBillingAddress: (state, action: PayloadAction<string>) => {
      state.selectedBillingAddressId = action.payload;
    },
    setSelectedShippingAddress: (state, action: PayloadAction<string>) => {
      state.selectedShippingAddressId = action.payload;
    },
  },
});

export const {
  addBillingAddress,
  addShippingAddress,
  updateBillingAddress,
  updateShippingAddress,
  removeBillingAddress,
  removeShippingAddress,
  setSelectedBillingAddress,
  setSelectedShippingAddress,
} = addressSlice.actions;

export default addressSlice.reducer;
