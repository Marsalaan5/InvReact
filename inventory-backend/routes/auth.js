



import express from "express";
import {signup,signin,forgotPassword,resetPassword,} from "../controller/authController.js";

import {createUser,getUser,getCurrentUser,editUserById,deleteUserById,createRole,getRoles,getRoleById,updateRoleById,deleteRoleById,getProfile,getProfileById,editProfileById,getAllPermissions,getPermissionsByRole,updatePermissions,getModules,} from "../controller/userController.js";

import { applyWarehouseFilter, authenticateToken, enforceWarehouseAccess } from "../middleware/authMiddleware.js";
import {checkPermission} from "../middleware/checkPermission.js";
import {deleteMenu,getAllMenuItems,getMenu,patchMenu,postMenu,postReorderMenu,putMenu,} from "../controller/menuController.js";
import { getProduct,getProductById,createProduct,updateProductById,deleteProduct, getProductByScan } from "../controller/productController.js";
import { createWh, getWhEmail, getWhPhone, getWhTitle,getAllWarehouses,getWarehouseById,deleteWarehouse,updateWarehouse, getDashboard } from "../controller/warehouseController.js";

import { getEmails,getEmailById,markAsRead,toggleStar,deleteEmail,bulkAction,getTemplates, sendEmails, getNotifications, createNotification, createNotificationByEmail, deleteNotification, markAllNotificationsAsRead, markNotificationAsRead, getReceivedEmails, saveDraft, sendStockRequest, respondToStockRequest} from "../controller/emailController.js";
import { exportToExcel, exportToPDF } from "../controller/exportController.js";
import { createStockFlow, deleteStockFlow, getStockFlowById, getStockFlowOptions, getStockFlows, getStockFlowStats, updateStockFlowById } from "../controller/stockController.js";
import { generateStockFlowInvoice } from "../controller/invoiceController.js";
// import { exportToExcel, exportToPDF } from "../services/exportC.js";



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

router.get('/getDashboard',enforceWarehouseAccess,applyWarehouseFilter,getDashboard)
// Users
// router.get('/users/profile', getProfile);
// router.get('/users/profile/:id', getProfileById);
router.get("/getUser", applyWarehouseFilter ,checkPermission("User", "view"), getUser);
// router.get("/getUserById/:id", checkPermission("User", "view"), getUserById);
router.get("/getCurrentUser", checkPermission("User", "view"), getCurrentUser );
router.post("/createUser", checkPermission("User", "create"), createUser);
router.put("/editUserById/:id", checkPermission("User", "edit"), editUserById);
router.delete("/deleteUserById/:id",checkPermission("User", "delete"),deleteUserById);

router.get("/getProfile", authenticateToken, getProfile);
router.get("/getProfileById/:id", authenticateToken, getProfileById);
router.put("/editProfileById/:id", authenticateToken, editProfileById);

// Roles
router.get("/roles",authenticateToken,applyWarehouseFilter ,checkPermission("Role", "view"),getRoles);
router.get("/roles/:id",authenticateToken,checkPermission("Role", "view"),getRoleById);
router.post("/roles",authenticateToken,checkPermission("Role", "create"),createRole);
router.put("/roles/:id",authenticateToken,checkPermission("Role", "edit"),updateRoleById);
router.delete("/roles/:id", checkPermission("Role", "delete"), deleteRoleById);

// Permissions
router.get("/permissions/role/:roleId",authenticateToken,checkPermission("Permission", "view"),getPermissionsByRole);
router.post("/permissions/update",authenticateToken,checkPermission("Permission", "edit"),updatePermissions);
router.get("/permissions/modules",authenticateToken,checkPermission("Permission", "view"),getModules);

// Menu
router.get('/menu/all', authenticateToken,checkPermission("Menu Management", "view"), getAllMenuItems);
router.get("/menu",authenticateToken,checkPermission("Menu Management", "view"),getMenu);
router.post("/menu",authenticateToken,checkPermission("Menu Management", "create"),postMenu);
router.put("/menu/:id",authenticateToken,checkPermission("Menu Management", "edit"),putMenu);
router.patch("/menu/:id/status",authenticateToken,checkPermission("Menu Management", "edit"),patchMenu);
router.delete("/menu/:id",authenticateToken,checkPermission("Menu Management", "delete"),deleteMenu);
router.post("/menu/reorder",authenticateToken,checkPermission("Menu Management", "edit"),postReorderMenu)

//warehouse

router.get("/getWarehouse",authenticateToken,enforceWarehouseAccess,applyWarehouseFilter,checkPermission("Warehouse", "view"),getAllWarehouses);
router.get("/getWarehouseById/:id",authenticateToken, enforceWarehouseAccess,
  applyWarehouseFilter,checkPermission("Warehouse", "view"),getWarehouseById);
router.get("/getWarehouseEmail/unique/email/:idx",authenticateToken, enforceWarehouseAccess,
  applyWarehouseFilter,checkPermission("Warehouse", "view"),getWhEmail);
router.get("/getWarehouseTitle/unique/title/:idx",authenticateToken, enforceWarehouseAccess,
  applyWarehouseFilter,checkPermission("Warehouse", "view"),getWhTitle);

router.get("/getWarehousePhone/unique/phone/:idx",authenticateToken, enforceWarehouseAccess,
  applyWarehouseFilter,checkPermission("Warehouse", "view"),getWhPhone);

router.post("/createWarehouse/create",authenticateToken,checkPermission("Warehouse", "create"),createWh);

router.put("/editWarehouseById/:id",authenticateToken,checkPermission("Warehouse", "edit"),updateWarehouse);
router.delete("/deleteWarehouseById/:id",authenticateToken,checkPermission("Warehouse", "delete"),deleteWarehouse);


router.get("/getProduct",authenticateToken, enforceWarehouseAccess,
  applyWarehouseFilter,checkPermission("Product", "view"), getProduct)
router.get("/getProductById/:id",authenticateToken, enforceWarehouseAccess,
  applyWarehouseFilter,checkPermission("Product", "view"),getProductById);
router.get('/getProductByScan/scan/:code',authenticateToken, enforceWarehouseAccess,
  applyWarehouseFilter,checkPermission("Product","view"), getProductByScan);
router.post("/createProduct",authenticateToken,checkPermission("Product", "create"), createProduct)
router.put("/editProductById/:id",authenticateToken,checkPermission("Product", "edit"),updateProductById);
router.delete("/deleteProductById/:id",authenticateToken,checkPermission("Product", "delete"),deleteProduct);


router.get('/getStockFlowOptions',authenticateToken,checkPermission('StockFlow', 'view'), getStockFlowOptions);
router.get('/getStockFlows',authenticateToken,applyWarehouseFilter,checkPermission('StockFlow', 'view'),getStockFlows);
router.get('/getStockFlowStats/stats',authenticateToken,applyWarehouseFilter,checkPermission('StockFlow', 'view'),getStockFlowStats);
router.get('/getStockFlowByID/:id',authenticateToken,applyWarehouseFilter,checkPermission('StockFlow', 'view'),getStockFlowById);
router.post('/createStockFlow',authenticateToken,applyWarehouseFilter,checkPermission('StockFlow', 'create'),createStockFlow);
router.put('/updateStockFLowByID/:id',authenticateToken,applyWarehouseFilter,checkPermission('StockFlow', 'edit'),updateStockFlowById);
router.delete('/deleteStockFlow/:id',authenticateToken,applyWarehouseFilter,
  checkPermission('StockFlow', 'delete'),deleteStockFlow);









router.get("/notification",authenticateToken,checkPermission("Notification", "view"), getNotifications)
// router.get("/notification/:id",authenticateToken,checkPermission("Notification", "view"),getNotificationById);
router.post("/notification",authenticateToken,checkPermission("Notification", "create"), createNotification)
router.post("/notification/:id",authenticateToken,checkPermission("Notification", "create"),createNotificationByEmail);
router.put("/notification/:id",authenticateToken,checkPermission("Product", "edit"),markNotificationAsRead);
router.put("/notification/:id",authenticateToken,checkPermission("Product", "edit"),markAllNotificationsAsRead);
router.delete("/notification/:id",authenticateToken,checkPermission("Notification", "delete"),deleteNotification);




// router.get('/getEmail',authenticateToken,checkPermission("Email", "view") ,getEmails);
router.get('/getEmail/:category',authenticateToken,checkPermission("Email", "view") ,getEmails);
router.get('/getEmailById/:id',authenticateToken,checkPermission("Email", "view"), getEmailById);
router.get('/receivedEmail', authenticateToken, checkPermission("Email","view"),getReceivedEmails);
router.post('/draftEmail', authenticateToken,checkPermission("Email","create"),saveDraft);
router.post('/createEmail', authenticateToken,checkPermission("Email","create"),sendEmails);
router.post('/stock-request', authenticateToken,checkPermission("Email","create"), sendStockRequest);
router.post('/stock-request/:id/respond', authenticateToken,checkPermission("Email","create"), respondToStockRequest);

// router.post('/createBulkEmail/bulk/:action',authenticateToken,checkPermission("Email", "create"), bulkAction);

router.post('/bulkEmail/:action',authenticateToken,checkPermission("Email", "edit"),bulkAction);

router.put('/editEmailMark/:id/read',authenticateToken,checkPermission("Email", "edit"), markAsRead);
router.put('/editEmailTogglemail/:id/star',authenticateToken,checkPermission("Email", "edit"), toggleStar);
router.delete('/deleteEmail/:id',authenticateToken,checkPermission("Email", "delete"), deleteEmail);

router.get('/getTemplates/all',authenticateToken,checkPermission("Templates", "view") ,getTemplates);



router.get('/stockflow/:id/invoice',authenticateToken, generateStockFlowInvoice);


router.get("/export/:entity/pdf",authenticateToken, exportToPDF);
router.get("/export/:entity/excel",authenticateToken, exportToExcel);

export default router;


