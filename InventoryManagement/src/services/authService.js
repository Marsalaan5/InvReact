// import axiosInstance from "./axiosInstance";

// const AuthService = {
//   register: (data) => axiosInstance.post("/auth/signup", data),

//   login: (data) => axiosInstance.post("/auth/signin", data),

//   forgotPassword: (data) => axiosInstance.post("/auth/forgot-password", data),

//   resetPassword: (data) => axiosInstance.post("/auth/reset-password", data),

//     getUser: () => axiosInstance.get("/auth/getUser"),

//     getUserById: () => axiosInstance.get("/auth/getUser/:id"),

//   updateUser: (data) => axiosInstance.put("/auth/editUserById/:id", data),
//   deleteUserById: () => axiosInstance.put("/auth/deleteUserById/:id"),
// };

// export default AuthService;

// import axiosInstance from "./axiosInstance";

// const AuthService = {
//   register: (data) => axiosInstance.post("/auth/signup", data),
//   login: (data) => axiosInstance.post("/auth/signin", data),
//   forgotPassword: (data) => axiosInstance.post("/auth/forgot-password", data),
//   resetPassword: (data) => axiosInstance.post("/auth/reset-password", data),
//   createUser: (data) => axiosInstance.post("/auth/createUser", data),
//   getUser: () => axiosInstance.get("/auth/getUser"),
//   getUserById: (id) => axiosInstance.get(`/auth/getUserById/${id}`),
//   editUserById: (id, data) => axiosInstance.put(`/auth/editUserById/${id}`, data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     }
//   }),
//   deleteUserById: (id) => axiosInstance.delete(`/auth/deleteUserById/${id}`),

//   // Profile
//   getProfile: () => axiosInstance.get("/auth/getProfile"),
//   updateProfile: (data) => axiosInstance.put("/auth/editProfileById", data, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     }
//   }),
//   getProfileById: (id) => axiosInstance.get(`/auth/getProfileById/${id}`),

//   // Roles
//   getRoles: () => axiosInstance.get("/auth/roles"),
//   getRoleById: (id) => axiosInstance.get(`/auth/roles/${id}`),
//   createRole: (data) => axiosInstance.post("/auth/roles", data),
//   updateRole: (id, data) => axiosInstance.put(`/auth/roles/${id}`, data),
//   deleteRole: (id) => axiosInstance.delete(`/auth/roles/${id}`),

//   getAllPermissions: () => axiosInstance.get('/auth/permissions'),
//   getPermissionsByRole: (roleId) => axiosInstance.get(`/auth/permissions/${roleId}`),
//   updatePermissions: (roleId, permissions) =>
//     axiosInstance.post('/auth/permissions/update', { roleId, permissions }),
//   getModules: () => axiosInstance.get('/auth/permissions/modules'),

//   //Menu Management
//   getMenu: (showAll = false) => axiosInstance.get(`/auth/menu?showAll=${showAll}`),
//   getAllMenuItems: () => axiosInstance.get('/auth/menu?showAll=true'),
//   createMenuItem: (data) => axiosInstance.post('/auth/menu', data),
//   updateMenuItem: (id, data) => axiosInstance.put(`/auth/menu/${id}`, data),
//   deleteMenuItem: (id) => axiosInstance.delete(`/auth/menu/${id}`),
//   updateMenuStatus: (id, status) => axiosInstance.patch(`/auth/menu/${id}/status`, { status }),
//   reorderMenu: (menuItems) => axiosInstance.post('/auth/menu/reorder', { menu: menuItems }),
// };

// export const updateUser = (id, data) => axiosInstance.put(`/auth/editUserById/${id}`, data, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   }
// });

// export default AuthService;




import axiosInstance from "./axiosInstance";

const AuthService = {
  register: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/signin", data),
  forgotPassword: (data) => axiosInstance.post("/auth/forgot-password", data),
  resetPassword: (data) => axiosInstance.post("/auth/reset-password", data),


  createUser: (data) => axiosInstance.post("/auth/createUser", data),
  getUser: () => axiosInstance.get("/auth/getUser"),
  getCurrentUser: () => axiosInstance.get("/auth/getCurrentUser"),

  getUserById: (id) => axiosInstance.get(`/auth/getUserById/${id}`),
  editUserById: (id, data) =>
    axiosInstance.put(`/auth/editUserById/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteUserById: (id) => axiosInstance.delete(`/auth/deleteUserById/${id}`),

  // Profile
  getProfile: () => axiosInstance.get("/auth/getProfile"),
  updateProfile: (data) =>
    axiosInstance.put("/auth/editProfileById", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getProfileById: (id) => axiosInstance.get(`/auth/getProfileById/${id}`),

  // Roles - Fixed to match your backend routes
  getRoles: () => axiosInstance.get("/auth/roles"),
  getRoleById: (id) => axiosInstance.get(`/auth/roles/${id}`),
  createRole: (data) => axiosInstance.post("/auth/roles", data),
  updateRoleById: (id, data) => axiosInstance.put(`/auth/roles/${id}`, data),
  deleteRoleById: (id) => axiosInstance.delete(`/auth/roles/${id}`),

  // Permissions - Fixed routes to match backend
  getAllPermissions: () => axiosInstance.get("/auth/permissions"),
  getPermissionsByRole: (roleId) => {
    console.log("Fetching permissions for role:", roleId);
    return axiosInstance.get(`/auth/permissions/role/${roleId}`);
  },
  updatePermissions: (roleId, permissions) => {
    console.log("Updating permissions:", { roleId, permissions });
    return axiosInstance.post("/auth/permissions/update", {
      roleId,
      permissions,
    });
  },
  getModules: () => axiosInstance.get("/auth/permissions/modules"),

  // Menu Management
  getMenu: (showAll = false) =>
    axiosInstance.get(`/auth/menu?showAll=${showAll}`),
  getAllMenuItems: () => axiosInstance.get("/auth/menu?showAll=true"),
  createMenuItem: (data) => axiosInstance.post("/auth/menu", data),
  updateMenuItem: (id, data) => axiosInstance.put(`/auth/menu/${id}`, data),
  deleteMenuItem: (id) => axiosInstance.delete(`/auth/menu/${id}`),
  updateMenuStatus: (id, status) =>
    axiosInstance.patch(`/auth/menu/${id}/status`, { status }),
  reorderMenu: (menuItems) =>
    axiosInstance.post(`/auth/menu/reorder`, { menu: menuItems }),



  getWarehouse: () => axiosInstance.get(`/auth/warehouse`),
  getWarehouseById: (id) => axiosInstance.get(`/auth/warehouse/${id}`),
  getWarehouseEmail: (idx) => axiosInstance.get(`/auth/warehouse/unique/email/${idx}`),
  getWarehouseTitle: (idx) => axiosInstance.get(`/auth/warehouse/unique/title/${idx}`),
  getWarehousePhone: (idx) => axiosInstance.get(`/auth/warehouse/unique/phone/${idx}`),
  createWarehouse: (data) => axiosInstance.post(`/auth/warehouse/create`, data),
  updateWarehouseById: (id,data) => axiosInstance.post(`/auth/warehouse/${id}`, data),
  deleteWarehouse: (data) => axiosInstance.post(`/auth/warehouse`, data),
  
  
  //Prodcut
  getProduct:() => axiosInstance.get(`/auth/product`),
  getProductById: (id) => axiosInstance.get(`/auth/product/${id}`),
  createProduct:(data) => axiosInstance.post(`/auth/product`,data),
  updatProductById: (id,data) => axiosInstance.post(`/auth/product/${id}`, data),
  deleteProduct: (data) => axiosInstance.post(`/auth/product`, data),
};


//warehouse



export const updateUser = (id, data) =>
  axiosInstance.put(`/auth/editUserById/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default AuthService;
