//for static

// // redux/slices/productSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { productlistdata } from '../../json/productlistdata';
// // import { brandlistdata } from '../../json/brandlistdata';

// const initialState = {
//   product_list: productlistdata,
// //   brand_list: brandlistdata,
// };

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setProductList: (state, action) => {
//       state.product_list = action.payload;
//     },
    
//   },
// });

// export const { setProductList, setBrandList } = productSlice.actions;
// export default productSlice.reducer;




//for dynamic from Api later : TO DO


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// async thunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://your-backend-api.com/products');
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data;
  }
);

const initialState = {
  product_list: [], // initially empty when fetching from backend
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.product_list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product_list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setProductList } = productSlice.actions;
export default productSlice.reducer;
