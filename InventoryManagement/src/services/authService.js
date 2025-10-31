
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




import axiosInstance from "./axiosInstance";

const AuthService = {

  register: (data) => axiosInstance.post("/auth/signup", data),
  login: (data) => axiosInstance.post("/auth/signin", data),
  forgotPassword: (data) => axiosInstance.post("/auth/forgot-password", data),
  resetPassword: (data) => axiosInstance.post("/auth/reset-password", data),


  createUser: (data) => axiosInstance.post("/auth/createUser", data),
  getUser: () => axiosInstance.get("/auth/getUser"),
  getUserById: (id) => axiosInstance.get(`/auth/getUserById/${id}`),
  updateUserById: (id) => axiosInstance.put(`/auth/editUserById/${id}`),
  deleteUserById: (id) => axiosInstance.delete(`/auth/deleteUserById/${id}`),





  getRoles: () => axiosInstance.get("/auth/roles"), 
  getRoleById: (id) => axiosInstance.get(`/auth/roles/${id}`), 
  createRole: (data) => axiosInstance.post("/auth/roles", data), 
  updateRole: (id, data) => axiosInstance.put(`/auth/roles/${id}`, data), 
  deleteRole: (id) => axiosInstance.delete(`/auth/roles/${id}`), 


};


export const updateUser = (id, data) => axiosInstance.put(`/auth/editUserById/${id}`, data, {
  headers: {
    "Content-Type": "multipart/form-data",
  }
});

export default AuthService;
