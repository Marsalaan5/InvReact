
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
  getUser: () => axiosInstance.get("/auth/getUser"),
  getUserById: (id) => axiosInstance.get(`/auth/getUser/${id}`),
  deleteUserById: (id) => axiosInstance.delete(`/auth/deleteUserById/${id}`),
};

// Adding the `updateUser` function separately, outside the object
export const updateUser = (id, data) => axiosInstance.put(`/auth/editUserById/${id}`, data, {
  headers: {
    "Content-Type": "multipart/form-data",  // This tells the backend to expect form data
  }
});

export default AuthService;
