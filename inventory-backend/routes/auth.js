// const express = require("express");
// const router = express.Router();
// const authController = require("../controller/authController");
// const userController = require("../controller/userController");


// router.post("/signup", authController.signup);
// router.post("/signin", authController.signin);
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/reset-password", authController.resetPassword);



// router.get('/', getUser);
// router.get('/:id', getUserById);
// router.put('/:id', editUserById);
// router.delete('/:id', deleteUserById);

// module.exports = router;


// // routes/authRoutes.js
// import express from "express";
// import { signup, signin, forgotPassword, resetPassword } from "../controller/authController.js";


// import { createUser, getUser, getUserById, editUserById, deleteUserById, createRole, getRoles, getRoleById, updateRoleById, deleteRoleById ,getProfile, getProfileById, editProfileById,getAllPermissions,getPermissionsByRole,updatePermissions,getModules } from "../controller/userController.js";

// import { authenticateToken } from "../middleware/authMiddleware.js";
// import { checkAnyPermission,checkPermission,checkRole } from "../middleware/checkPermission.js";
// import { deleteMenu, getMenu, patchMenu, postMenu, postReorderMenu, putMenu } from "../controller/menuController.js";


// const router = express.Router();

// // Auth routes
// router.post("/signup", signup);
// router.post("/signin", signin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// // User routes
// router.post('/createUser', createUser);
// router.get('/getUser', getUser);
// router.get('/getUserById/:id', getUserById);
// router.put('/editUserById/:id', editUserById);
// router.delete('/deleteUserById/:id', deleteUserById);


// router.get('/getProfile', authenticateToken,getProfile);
// router.get('/getProfileById/:id', authenticateToken, getProfileById);
// router.put('/editProfileById/:id', authenticateToken, editProfileById);


// //role routes

// router.post('/roles', createRole);
// router.get('/roles', getRoles);
// router.get('/roles/:id', getRoleById);
// router.put('/roles/:id', updateRoleById); 
// router.delete('/roles/:id', deleteRoleById);


// router.get('/permissions/role/:roleId', getPermissionsByRole);
// router.post('/permissions/update', updatePermissions);
// router.get('/permissions/modules', getModules);



// //menu routes
// router.get("/menu", authenticateToken, getMenu);
// router.post("/menu", authenticateToken, postMenu);
// router.put("/menu/:id", authenticateToken, putMenu);
// router.patch("/menu/:id/status", authenticateToken, patchMenu);
// router.delete("/menu/:id", authenticateToken, deleteMenu);
// router.post("/menu/reorder", authenticateToken, postReorderMenu);





// export default router;



import express from "express";
import { 
  signup, signin, forgotPassword, resetPassword 
} from "../controller/authController.js";
import { 
  createUser, getUser, getUserById, editUserById, deleteUserById, 
  createRole, getRoles, getRoleById, updateRoleById, deleteRoleById, 
  getProfile, getProfileById, editProfileById,
  getAllPermissions, getPermissionsByRole, updatePermissions, getModules
} from "../controller/userController.js";
import { 
  authenticateToken 
} from "../middleware/authMiddleware.js";
import { 
  checkPermission, checkRole, checkAnyPermission 
} from "../middleware/checkPermission.js";
import { 
  deleteMenu, getMenu, patchMenu, postMenu, postReorderMenu, putMenu 
} from "../controller/menuController.js";

const router = express.Router();

// =========================
// Auth routes (public)
// =========================
// router.post("/signup", signup);
// router.post("/signin", signin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// =========================
// User routes
// =========================
router.use('/users', authenticateToken);

// Public auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Apply auth middleware globally for all protected routes
router.use(authenticateToken);

// Users
// router.get('/users/profile', getProfile);
// router.get('/users/profile/:id', getProfileById);
router.get('/getUser', checkPermission('User', 'view'), getUser);
router.get('/getUserById/:id', checkPermission('User', 'view'), getUserById);
router.post('/createUser', checkPermission('User', 'create'), createUser);
router.put('/editUserById/:id', checkPermission('User', 'edit'), editUserById);
router.delete('/deleteUserById/:id', checkPermission('User', 'delete'), deleteUserById);



router.get('/getProfile', authenticateToken,getProfile);
router.get('/getProfileById/:id', authenticateToken, getProfileById);
router.put('/editProfileById/:id', authenticateToken, editProfileById);


// Roles
router.get('/roles',authenticateToken, checkPermission('Role', 'view'), getRoles);
router.get('/roles/:id',authenticateToken, checkPermission('Role', 'view'), getRoleById);
router.post('/roles',authenticateToken, checkPermission('Role', 'create'), createRole);
router.put('/roles/:id',authenticateToken, checkPermission('Role', 'edit'), updateRoleById);
router.delete('/roles/:id', checkPermission('Role', 'delete'), deleteRoleById);

// Permissions
router.get('/permissions/role/:roleId',authenticateToken, checkPermission('Permission', 'view'), getPermissionsByRole);
router.post('/permissions/update',authenticateToken, checkPermission('Permission', 'edit'), updatePermissions);
router.get('/permissions/modules',authenticateToken, checkPermission('Permission', 'view'), getModules);

// Menu
router.get("/menu",authenticateToken, checkPermission('Menu Management', 'view'), getMenu);
router.post("/menu",authenticateToken, checkPermission('Menu Management', 'create'), postMenu);
router.put("/menu/:id",authenticateToken, checkPermission('Menu Management', 'edit'), putMenu);
router.patch("/menu/:id/status",authenticateToken, checkPermission('Menu Management', 'edit'), patchMenu);
router.delete("/menu/:id",authenticateToken, checkPermission('Menu Management', 'delete'), deleteMenu);
router.post("/menu/reorder",authenticateToken, checkPermission('Menu Management', 'edit'), postReorderMenu);

export default router;
