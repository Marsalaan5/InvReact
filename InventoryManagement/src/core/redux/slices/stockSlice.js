// stockFlowSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/authService';

// Async thunk to fetch stock flows
export const fetchStockFlows = createAsyncThunk(
  'stockFlow/fetchStockFlows',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await AuthService.getStockFlows(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to fetch stock flow by ID
export const fetchStockFlowById = createAsyncThunk(
  'stockFlow/fetchStockFlowById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await AuthService.getStockFlowById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to create stock flow
export const createStockFlow = createAsyncThunk(
  'stockFlow/createStockFlow',
  async (stockFlowData, { rejectWithValue }) => {
    try {
      const response = await AuthService.createStockFlow(stockFlowData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update stock flow
export const updateStockFlow = createAsyncThunk(
  'stockFlow/updateStockFlow',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await AuthService.updateStockFlowById(id, data);
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to delete stock flow
export const deleteStockFlow = createAsyncThunk(
  'stockFlow/deleteStockFlow',
  async (id, { rejectWithValue }) => {
    try {
      await AuthService.deleteStockFlow(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to fetch statistics
export const fetchStockFlowStats = createAsyncThunk(
  'stockFlow/fetchStockFlowStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.getStockFlowStats();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  stockFlows: [],
  currentStockFlow: null,
  stats: {
    total: 0,
    approved: 0,
    in_transit: 0,
    delivered: 0,
    total_quantity: 0,
  },
  filters: {
    search: '',
    status: '',
    transport: '',
    from_wh: '',
    to_wh: '',
    sortBy: 'created_at',
    sortOrder: 'DESC',
  },
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  createStatus: 'idle',
  updateStatus: 'idle',
  deleteStatus: 'idle',
  statsStatus: 'idle',
};

const stockFlowSlice = createSlice({
  name: 'stockFlow',
  initialState,
  reducers: {
    setStockFlows: (state, action) => {
      state.stockFlows = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentStockFlow: (state, action) => {
      state.currentStockFlow = action.payload;
    },
    clearCurrentStockFlow: (state) => {
      state.currentStockFlow = null;
    },
    resetStockFlowState: () => {
      return initialState;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stock Flows
      .addCase(fetchStockFlows.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStockFlows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stockFlows = action.payload.data || [];
        state.pagination = action.payload.pagination || state.pagination;
        state.error = null;
      })
      .addCase(fetchStockFlows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Fetch Stock Flow By ID
      .addCase(fetchStockFlowById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStockFlowById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentStockFlow = action.payload;
      })
      .addCase(fetchStockFlowById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Stock Flow
      .addCase(createStockFlow.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createStockFlow.fulfilled, (state) => {
        state.createStatus = 'succeeded';
      })
      .addCase(createStockFlow.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload;
      })

      // Update Stock Flow
      .addCase(updateStockFlow.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(updateStockFlow.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        const index = state.stockFlows.findIndex(sf => sf.id === action.payload.id);
        if (index !== -1) {
          state.stockFlows[index] = { ...state.stockFlows[index], ...action.payload.data };
        }
      })
      .addCase(updateStockFlow.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.payload;
      })

      // Delete Stock Flow
      .addCase(deleteStockFlow.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteStockFlow.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded';
        state.stockFlows = state.stockFlows.filter(sf => sf.id !== action.payload);
      })
      .addCase(deleteStockFlow.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.payload;
      })

      // Fetch Stats
      .addCase(fetchStockFlowStats.pending, (state) => {
        state.statsStatus = 'loading';
      })
      .addCase(fetchStockFlowStats.fulfilled, (state, action) => {
        state.statsStatus = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchStockFlowStats.rejected, (state, action) => {
        state.statsStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  setStockFlows,
  setFilters,
  resetFilters,
  setCurrentStockFlow,
  clearCurrentStockFlow,
  resetStockFlowState,
  clearError,
} = stockFlowSlice.actions;

export default stockFlowSlice.reducer;