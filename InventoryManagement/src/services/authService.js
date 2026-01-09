


import axiosInstance from "./axiosInstance";

const AuthService = {
  register: (data) => axiosInstance.post("/auth/signup", data),


 verifyEmail: (token) => axiosInstance.get(`/verify-email/${token}`),
resendVerification: (data) => axiosInstance.post('/resend-verification', data),
  
  
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

  // getMenu:() => axiosInstance.get(`/auth/menu`),
  // getAllMenuItems:() => axiosInstance.get(`/auth/menu/All`),
  createMenuItem: (data) => axiosInstance.post("/auth/menu", data),
  updateMenuItem: (id, data) => axiosInstance.put(`/auth/menu/${id}`, data),
  deleteMenuItem: (id) => axiosInstance.delete(`/auth/menu/${id}`),
  updateMenuStatus: (id, status) =>
    axiosInstance.patch(`/auth/menu/${id}/status`, { status }),
  reorderMenu: (menuItems) =>
    axiosInstance.post(`/auth/menu/reorder`, { menu: menuItems }),


  
  
  getDashboard:() => axiosInstance.get(`/auth/getDashboard`),
  
  getWarehouse: () => axiosInstance.get(`/auth/getWarehouse`),
  getWarehouseById: (id) => axiosInstance.get(`/auth/getWarehouseById/${id}`),
  getWarehouseEmail: (idx) => axiosInstance.get(`/auth/getWarehouseEmail/unique/email/${idx}`),
  getWarehouseTitle: (idx) => axiosInstance.get(`/auth/getWarehouseTitle/unique/title/${idx}`),
  getWarehousePhone: (idx) => axiosInstance.get(`/auth/getWarehousePhone/unique/phone/${idx}`),
  createWarehouse: (data) => axiosInstance.post(`/auth/createWarehouse/create`, data),
  updateWarehouseById: (id,data) => axiosInstance.put(`/auth/editWarehouseById/${id}`, data),
  deleteWarehouse: (id) => axiosInstance.delete(`/auth/deleteWarehouseById/${id}`),
  
  
  
  getGlossaries: (params) => axiosInstance.get(`/auth/getGlossaries`, { params }),
  getGlossaryByID:(id) => axiosInstance.get(`/auth/getGlossaryById/${id}`),
  
  getArticles: (params) => axiosInstance.get(`/auth/getArticle`, { params }),
  getArticleById: (id) => axiosInstance.get(`/auth/getArticle/${id}`),
    // getArticleProfileById: (id) => axiosInstance.get(`/auth/getArticleProfile/${id}`),
  createArticle: (data) => axiosInstance.post(`/auth/createArticle`, data),
    // updateArticleById: (id, data) => axiosInstance.put(`/auth/articleProfile/${id}`, data),
    // deleteArticle: (id) => axiosInstance.delete(`/auth/articleProfile/${id}`),
  
  
  
  //Prodcut
  getProduct:() => axiosInstance.get(`/auth/getProduct`),
  getProductById: (id) => axiosInstance.get(`/auth/getProductById/${id}`),
  getProductByScan:(code) => axiosInstance.get(`/auth/getProductByScan/scan/${code}`),
  createProduct:(data) => axiosInstance.post(`/auth/createProduct`,data),
  updateProductById: (id,data) => axiosInstance.put(`/auth/editProductById/${id}`, data),
  deleteProduct: (id) => axiosInstance.delete(`/auth/deleteProductById/${id}`),


  // Stock Flow APIs
getStockFlowOptions:() => axiosInstance.get(`/auth/getStockFlowOptions`),
getStockFlows:()=>axiosInstance.get(`/auth/getStockFlows`),
getStockFlowById:(id) => axiosInstance.get(`/auth/getStockFlowByID/${id}`),
createStockFlow: (data) => axiosInstance.post(`/auth/createStockFlow`,data),
updateStockFlowById:(id,data) => axiosInstance.put(`/auth/updateStockFLowByID/${id}`,data),
deleteStockFlow:(id) => axiosInstance.delete(`/auth/deleteStockFlow/${id}`),
getStockFlowStats:() => axiosInstance.get(`/auth/getStockFlowStats/stats`),

  getStockFlowChartData: (params) => axiosInstance.get('/auth/getStockFlowChartData', { params }),
  getLowStockChartData: (params) => axiosInstance.get('/auth/getLowStockChartData', { params }),  
  getOutOfStockTrendData: (params) => axiosInstance.get('/auth/getOutOfStockTrendData', { params }),
  getStockStatusDistribution: (params) => axiosInstance.get('/auth/getStockStatusDistribution', { params }),
  getWarehouseComparison: (params) => axiosInstance.get('/auth/getWarehouseComparison', { params }),



getActivities: (params) => axiosInstance.get('/auth/activities', { params }),
getActivityStats: () => axiosInstance.get('/auth/activities/stats'),


//Email Service
getEmails: (category = 'inbox', page = 1, limit = 10, search = '') => 
  axiosInstance.get(`/auth/getEmail/${category}`, {params: { page, limit, search }}),
getEmailById: (id) => axiosInstance.get(`/auth/getEmailById/${id}`),
sendEmails: (data) => axiosInstance.post(`/auth/createEmail`, data),
saveDraft: (draftData) => axiosInstance.post(`/auth/draftEmail`, draftData),
sendStockRequest: (stockRequestData) => axiosInstance.post(`/auth/stock-request`, stockRequestData),
respondToStockRequest: (emailId, action,deadlineDays, notes = "") =>
  axiosInstance.post(`/auth/stock-request/${emailId}/respond`, { action,deadlineDays, notes }),

// sendStockRequest: (stockRequestData) =>
//   axiosInstance.post(`/auth/stock-request`, {
//     to: stockRequestData.to,
//     productName: stockRequestData.productName,
//     quantity: stockRequestData.quantity,
//     urgency: stockRequestData.urgency,
//     notes: stockRequestData.notes,
//     enableFollowUp: stockRequestData.enableFollowUp,
//     followUpDays: stockRequestData.followUpDays,
//     enableEscalation: stockRequestData.enableEscalation,
//     escalationEmail: stockRequestData.escalationEmail,
//     escalationDays: stockRequestData.escalationDays
//   }),

// respondToStockRequest: (emailId, action, notes = "") =>
//   axiosInstance.post(
//     `/auth/stock-request/${emailId}/respond`,
//     { action, notes }
//   ),



markEmailAsRead: (id) => axiosInstance.put(`/auth/editEmailMark/${id}/read`),
toggleEmailStar: (id, starred) => axiosInstance.put(`/auth/editEmailTogglemail/${id}/star`, { starred }),
deleteEmail: (id) => axiosInstance.delete(`/auth/deleteEmail/${id}`),
bulkEmailAction: (action, emailIds) =>
  axiosInstance.post(`/auth/bulkEmail/${action}`, { emailIds: emailIds }),
getTemplates: () => axiosInstance.get(`/auth/getTemplates/all`),



// Notifications
getNotifications: (limit = 20) => axiosInstance.get(`/auth/notification`, { params: { limit } }),
markNotificationAsRead: (id) => axiosInstance.put(`/auth/notification/${id}/read`),
markAllNotificationsAsRead: () => axiosInstance.put(`/auth/notification/mark-all-read`),

  
  // markAllNotificationsAsRead: () => 


downloadStockFlowInvoice: (id) => axiosInstance.get(`/auth/stockflow/${id}/invoice`, {responseType: 'blob'}),

};

export const updateUser = (id, data) =>
  axiosInstance.put(`/auth/editUserById/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export default AuthService;
