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



  getArticleProfile: () => axiosInstance.get(`/auth/articleProfile`),
  // getArticleProfileById: (id) => axiosInstance.get(`/auth/articleProfile/${id}`),
  // createArticleProfile: (data) => axiosInstance.post(`/auth/articleProfile/create`, data),
  // updateArticleProfile: (id,data) => axiosInstance.post(`/auth/articleProfile/${id}`, data),
  // deleteArticleProfile: (data) => axiosInstance.post(`/auth/articleProfile`, data),



  getWarehouse: () => axiosInstance.get(`/auth/getWarehouse`),
  getWarehouseById: (id) => axiosInstance.get(`/auth/getWarehouseById/${id}`),
  getWarehouseEmail: (idx) => axiosInstance.get(`/auth/getWarehouseEmail/unique/email/${idx}`),
  getWarehouseTitle: (idx) => axiosInstance.get(`/auth/getWarehouseTitle/unique/title/${idx}`),
  getWarehousePhone: (idx) => axiosInstance.get(`/auth/getWarehousePhone/unique/phone/${idx}`),
  createWarehouse: (data) => axiosInstance.post(`/auth/createWarehouse/create`, data),
  updateWarehouseById: (id,data) => axiosInstance.put(`/auth/editWarehouseById/${id}`, data),
  deleteWarehouse: (id) => axiosInstance.delete(`/auth/deleteWarehouseById/${id}`),
  
  
  //Prodcut
  getProduct:() => axiosInstance.get(`/auth/getProduct`),
  getProductById: (id) => axiosInstance.get(`/auth/getProductById/${id}`),
  getProductByScan:(code) => axiosInstance.get(`/auth/getProductByScan/scan/${code}`),
  createProduct:(data) => axiosInstance.post(`/auth/createProduct`,data),
  updatProductById: (id,data) => axiosInstance.put(`/auth/editProductById/${id}`, data),
  deleteProduct: (id) => axiosInstance.delete(`/auth/deleteProductById/${id}`),



  //Email Service
  getEmails:() => axiosInstance.get(`/auth/email`),
  getEmailById: (id) => axiosInstance.get(`/auth/email/${id}`),
  sendEmails:(data) => axiosInstance.post(`/auth/email`,data),
  markAsRead: (id,data) => axiosInstance.put(`/auth/email/${id}`, data),
  toggleStar: (id,data) => axiosInstance.put(`/auth/email/${id}`, data),
  deleteEmail: (data) => axiosInstance.post(`/auth/email`, data),
  bulkAction: (data) => axiosInstance.post(`/auth/email`, data),
  getTemplates: (data) => axiosInstance.get(`/auth/email`, data),



};


//warehouse



export const updateUser = (id, data) =>
  axiosInstance.put(`/auth/editUserById/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default AuthService;
