import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const BASE_URL = Config.WOO_COMMERCE_BASE_URL;
const CONSUMER_KEY = Config.WOO_COMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = Config.WOO_COMMERCE_CONSUMER_SECRET;

const wooCommerceApi = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: CONSUMER_KEY || '',
    password: CONSUMER_SECRET || '',
  },
  timeout: 10000, // Set timeout to 10 seconds
  // Add retry mechanism
  validateStatus: function (status) {
    return status >= 200 && status < 300; // Default
  },
});

// Check network connectivity
const isNetworkConnected = async () => {
  if (Platform.OS === 'web') return true;
  try {
    const response = await fetch('https://www.google.com');
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

// Add response interceptor for error handling
wooCommerceApi.interceptors.response.use(
  response => response,
  error => {
    if (error.message === 'Network Error') {
      console.error(
        'WooCommerce API Error: Please check your internet connection',
      );
    } else {
      console.error(
        'WooCommerce API Error:',
        error.response?.data || error.message,
      );
    }
    return Promise.reject(error);
  },
);

// API methods
export const getProducts = async (categoryId: number) => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }

    const response = await wooCommerceApi.get(
      `/products?category=${categoryId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }
    const response = await wooCommerceApi.get('/orders');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomers = async () => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }
    const response = await wooCommerceApi.get('/customers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategories = async (params?: {
  per_page?: number;
  parent?: number;
}) => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }
    const response = await wooCommerceApi.get('/products/categories', {params});
    console.log("response",response);
    
    return response.data;
  } catch (error) {
    console.log("error",error);
    
    throw error;
  }
};

export const getSubCategories = async (parentId: number) => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }
    const response = await wooCommerceApi.get('/products/categories', {
      params: {
        per_page: 50,
        parent: parentId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }

    const response = await wooCommerceApi.get('/products', {
      params: {
        per_page: 100, // Maximum allowed per page
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductDetails = async (productId: number) => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }

    const response = await wooCommerceApi.get(`/products/${productId}`);
    console.log("response All Peoducts",response.data);

    return response.data;
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getProducts,
  getAllProducts,
  getOrders,
  getCustomers,
  getCategories,
  getProductDetails,
};
