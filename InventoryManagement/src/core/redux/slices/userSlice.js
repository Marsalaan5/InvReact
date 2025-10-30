// // redux/slices/userSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// // Importing user-related mock data
// import { userlisadata } from '../../json/users';
// import { rolesandpermission } from '../../json/rolesandpermissiondata';
// import { deleteaccountdata } from '../../json/deleteaccount';

// const initialState = {
//   userlist_data: userlisadata,
//   rolesandpermission_data: rolesandpermission,
//   deleteaccount_data: deleteaccountdata,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     setUserList: (state, action) => {
//       state.userlist_data = action.payload;
//     },
//     setRolesAndPermission: (state, action) => {
//       state.rolesandpermission_data = action.payload;
//     },
//     setDeleteAccountData: (state, action) => {
//       state.deleteaccount_data = action.payload;
//     },
//   },
// });

// export const {
//   setUserList,
//   setRolesAndPermission,
//   setDeleteAccountData,
// } = userSlice.actions;

// export default userSlice.reducer;





// TO DO 



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Replace these static imports by initial empty arrays (or suitable defaults)
const initialState = {
  userlist_data: [],
  rolesandpermission_data: [],
  deleteaccount_data: [],
  status: 'idle',
  error: null,
};

// Async thunk to fetch user list
export const fetchUserList = createAsyncThunk(
  'user/fetchUserList',
  async () => {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Failed to fetch user list');
    return response.json();
  }
);

// Async thunk to fetch roles and permissions
export const fetchRolesAndPermission = createAsyncThunk(
  'user/fetchRolesAndPermission',
  async () => {
    const response = await fetch('/api/roles-permissions');
    if (!response.ok) throw new Error('Failed to fetch roles and permissions');
    return response.json();
  }
);

// Async thunk to fetch delete account data
export const fetchDeleteAccountData = createAsyncThunk(
  'user/fetchDeleteAccountData',
  async () => {
    const response = await fetch('/api/delete-account');
    if (!response.ok) throw new Error('Failed to fetch delete account data');
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userlist_data = action.payload;
    },
    setRolesAndPermission: (state, action) => {
      state.rolesandpermission_data = action.payload;
    },
    setDeleteAccountData: (state, action) => {
      state.deleteaccount_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // User List
      .addCase(fetchUserList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userlist_data = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Roles & Permission
      .addCase(fetchRolesAndPermission.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRolesAndPermission.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rolesandpermission_data = action.payload;
      })
      .addCase(fetchRolesAndPermission.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Delete Account Data
      .addCase(fetchDeleteAccountData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDeleteAccountData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deleteaccount_data = action.payload;
      })
      .addCase(fetchDeleteAccountData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setUserList,
  setRolesAndPermission,
  setDeleteAccountData,
} = userSlice.actions;

export default userSlice.reducer;
