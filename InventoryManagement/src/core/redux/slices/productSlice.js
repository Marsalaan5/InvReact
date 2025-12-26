

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/authService';


export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await AuthService.getProduct(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AuthService.getProductById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await AuthService.createProduct(productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await AuthService.updateProductById(id, data);
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await AuthService.deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const scanProduct = createAsyncThunk(
  'products/scanProduct',
  async (code, { rejectWithValue }) => {
    try {
      const response = await AuthService.getProductByScan(code);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  product_list: [],
  currentProduct: null,
  scannedProduct: null,
  filters: {
    search: '',
    status: '',
    warehouse_id: '',
    article_profile_id: '',
    sortBy: 'created_at',
    
    sortOrder: 'DESC',
  },
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  status: 'idle',
  error: null,
  createStatus: 'idle',
  updateStatus: 'idle',
  deleteStatus: 'idle',
  scanStatus: 'idle',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.product_list = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    clearScannedProduct: (state) => {
      state.scannedProduct = null;
      state.scanStatus = 'idle';
    },
    resetProductState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product_list = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

  
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      
      .addCase(createProduct.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
      
        if (action.payload.data) {
          state.product_list.unshift(action.payload.data);
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload;
      })

    
      .addCase(updateProduct.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const index = state.product_list.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.product_list[index] = { ...state.product_list[index], ...action.payload.data };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload;
      })

  
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.product_list = state.product_list.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.payload;
      })

    
      .addCase(scanProduct.pending, (state) => {
        state.scanStatus = 'loading';
      })
      .addCase(scanProduct.fulfilled, (state, action) => {
        state.scanStatus = 'succeeded';
        state.scannedProduct = action.payload;
      })
      .addCase(scanProduct.rejected, (state, action) => {
        state.scanStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setProductList,
  setFilters,
  resetFilters,
  setCurrentProduct,
  clearCurrentProduct,
  clearScannedProduct,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;