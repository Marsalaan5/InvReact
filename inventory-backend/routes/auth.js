



import express from "express";
import {signup,signin,forgotPassword,resetPassword,} from "../controller/authController.js";

import {createUser,getUser,getCurrentUser,editUserById,deleteUserById,createRole,getRoles,getRoleById,updateRoleById,deleteRoleById,getProfile,getProfileById,editProfileById,getAllPermissions,getPermissionsByRole,updatePermissions,getModules,} from "../controller/userController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";
import {checkPermission,checkRole,checkAnyPermission,} from "../middleware/checkPermission.js";
import {deleteMenu,getMenu,patchMenu,postMenu,postReorderMenu,putMenu,} from "../controller/menuController.js";
import { getProduct,getProductById,createProduct,updateProductById,deleteProduct } from "../controller/productController.js";
import { createWh, getWhEmail, getWhPhone, getWhTitle,getAllWarehouses,getWarehouseById,deleteWarehouse,updateWarehouse } from "../controller/warehouseController.js";

const router = express.Router();


// =========================
// User routes
// =========================

router.use("/users", authenticateToken);

// Public auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


router.use(authenticateToken);

// Users
// router.get('/users/profile', getProfile);
// router.get('/users/profile/:id', getProfileById);
router.get("/getUser", checkPermission("User", "view"), getUser);
// router.get("/getUserById/:id", checkPermission("User", "view"), getUserById);
router.get("/getCurrentUser", checkPermission("User", "view"), getCurrentUser );
router.post("/createUser", checkPermission("User", "create"), createUser);
router.put("/editUserById/:id", checkPermission("User", "edit"), editUserById);
router.delete("/deleteUserById/:id",checkPermission("User", "delete"),deleteUserById);

router.get("/getProfile", authenticateToken, getProfile);
router.get("/getProfileById/:id", authenticateToken, getProfileById);
router.put("/editProfileById/:id", authenticateToken, editProfileById);

// Roles
router.get("/roles",authenticateToken,checkPermission("Role", "view"),getRoles);
router.get("/roles/:id",authenticateToken,checkPermission("Role", "view"),getRoleById);
router.post("/roles",authenticateToken,checkPermission("Role", "create"),createRole);
router.put("/roles/:id",authenticateToken,checkPermission("Role", "edit"),updateRoleById);
router.delete("/roles/:id", checkPermission("Role", "delete"), deleteRoleById);

// Permissions
router.get("/permissions/role/:roleId",authenticateToken,checkPermission("Permission", "view"),getPermissionsByRole);
router.post("/permissions/update",authenticateToken,checkPermission("Permission", "edit"),updatePermissions);
router.get("/permissions/modules",authenticateToken,checkPermission("Permission", "view"),getModules);

// Menu
router.get("/menu",authenticateToken,checkPermission("Menu Management", "view"),getMenu);
router.post("/menu",authenticateToken,checkPermission("Menu Management", "create"),postMenu);
router.put("/menu/:id",authenticateToken,checkPermission("Menu Management", "edit"),putMenu);
router.patch("/menu/:id/status",authenticateToken,checkPermission("Menu Management", "edit"),patchMenu);
router.delete("/menu/:id",authenticateToken,checkPermission("Menu Management", "delete"),deleteMenu);
router.post("/menu/reorder",authenticateToken,checkPermission("Menu Management", "edit"),postReorderMenu)

//warehouse

router.get("/warehouse",authenticateToken,checkPermission("Warehouse", "view"),getAllWarehouses);
router.get("/warehouse/:id",authenticateToken,checkPermission("Warehouse", "view"),getWarehouseById);
router.get("/warehouse/unique/email/:idx",authenticateToken,checkPermission("Warehouse", "view"),getWhEmail);
router.get("/warehouse/unique/title/:idx",authenticateToken,checkPermission("Warehouse", "view"),getWhTitle);

router.get("/warehouse/unique/phone/:idx",authenticateToken,checkPermission("Warehouse", "view"),getWhPhone);

router.post("/warehouse/create",authenticateToken,checkPermission("Warehouse", "create"),createWh);

router.put("/warehouse/:id",authenticateToken,checkPermission("Warehouse", "edit"),updateWarehouse);
router.delete("/warehouse/:id",authenticateToken,checkPermission("Warehouse", "delete"),deleteWarehouse);


router.get("/product",authenticateToken, getProduct)
router.get("/product/:id",authenticateToken,checkPermission("Product", "view"),getProductById);
router.post("/product",authenticateToken, createProduct)
router.put("/product/:id",authenticateToken,checkPermission("Product", "edit"),updateProductById);
router.delete("/product/:id",authenticateToken,checkPermission("Product", "delete"),deleteProduct);



export default router;
