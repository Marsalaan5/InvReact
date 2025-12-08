// // src/redux/menuSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import menuService from '../services/menuService';

// // Async thunks
// export const fetchMenu = createAsyncThunk(
//   'menu/fetchMenu',
//   async (showAll = false, { rejectWithValue }) => {
//     try {
//       const data = await menuService.getMenu(showAll);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch menu');
//     }
//   }
// );

// const menuSlice = createSlice({
//   name: 'menu',
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearMenu: (state) => {
//       state.items = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMenu.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMenu.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(fetchMenu.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearMenu } = menuSlice.actions;
// export default menuSlice.reducer;











// src/redux/menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../../services/authService';

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (showAll = false, { rejectWithValue }) => {
    try {
      const response = await AuthService.getMenu(showAll);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch menu');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMenu: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMenu } = menuSlice.actions;
export default menuSlice.reducer;




// // redux/slices/menuSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from '../../../services/axiosInstance';

// const initialState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// // ✅ Fetch menu based on user's role (filtered by backend)
// export const fetchMenu = createAsyncThunk(
//   'menu/fetchMenu',
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log('🔄 Fetching menu from API...');
//       const response = await axiosInstance.get('/menu');
//       console.log('✅ Menu received:', response.data.length, 'items');
//       return response.data;
//     } catch (error) {
//       console.error('❌ Failed to fetch menu:', error);
//       return rejectWithValue(error.response?.data || 'Failed to fetch menu');
//     }
//   }
// );

// const menuSlice = createSlice({
//   name: 'menu',
//   initialState,
//   reducers: {
//     clearMenu: (state) => {
//       state.items = [];
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMenu.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMenu.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//         state.error = null;
//         console.log('✅ Menu stored in Redux:', state.items.length, 'items');
//       })
//       .addCase(fetchMenu.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         console.error('❌ Menu fetch failed:', action.payload);
//       });
//   },
// });

// export const { clearMenu } = menuSlice.actions;
// export default menuSlice.reducer;