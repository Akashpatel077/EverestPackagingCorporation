import axios from 'axios';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const AUTH_BASE_URL = 'https://everestpackaging.co.in';  // Removed trailing slash

export const loginUserApi = async (username: string, password: string) => {
  try {
    const response = await axios.post(
      `${AUTH_BASE_URL}/wp-json/jwt-auth/v1/token`,
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("Login Error:",error);
    
    throw error;
  }
};

export const fetchUserProfileApi = async (token: string) => {
  try {
    const response = await axios.get(
      `${AUTH_BASE_URL}/wp-json/wp/v2/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log("User Profile Response:", response.data);
    
    return response.data;
  } catch (error) {
    console.log("Fetch USer Profile Error:",error);
    
    throw error;
  }
};

export const registerUserApi = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post(
      `${AUTH_BASE_URL}/wp-json/custom/v1/register`,
      { username, email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log("Registration Response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

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
export const getProducts = async (categoryId: number, currentPage: number) => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }

    const response = await wooCommerceApi.get(
      `/products?category=${categoryId}&order=asc&orderby=price&page=${currentPage}`,
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

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSubCategories = async (parentId?: number) => {
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductVariations = async (productId: number) => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }

    const response = await wooCommerceApi.get(
      `/products/${productId}/variations?per_page=100`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTaxes = async () => {
  try {
    const isConnected = await isNetworkConnected();
    if (!isConnected) {
      throw new Error(
        'No internet connection. Please check your network settings.',
      );
    }

    const response = await wooCommerceApi.get(`/taxes`);
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
  getProductVariations,
  getAllTaxes,
};
