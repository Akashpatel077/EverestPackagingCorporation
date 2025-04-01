import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const BASE_URL = Config.WOO_COMMERCE_BASE_URL;
const CONSUMER_KEY = Config.WOO_COMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = Config.WOO_COMMERCE_CONSUMER_SECRET;

const wooCommerceApi = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: CONSUMER_KEY,
    password: CONSUMER_SECRET,
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
export const getProducts = async () => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }
    console.log('BASE_URL', BASE_URL, CONSUMER_SECRET, CONSUMER_KEY);

    const response = await wooCommerceApi.get('/products');
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

export const getCategories = async () => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }
    const response = await wooCommerceApi.get('/products/categories');
    console.log('Product category', response.data, 'response.data');

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getProducts,
  getOrders,
  getCustomers,
  getCategories,
};
