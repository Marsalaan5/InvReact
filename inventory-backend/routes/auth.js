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


// routes/authRoutes.js
import express from "express";
import { signup, signin, forgotPassword, resetPassword } from "../controller/authController.js";
import { createUser, getUser, getUserById, editUserById, deleteUserById } from "../controller/userController.js";
import { createRole, getRoles, getRoleById, updateRoleById, deleteRoleById} from "../controller/userController.js";
import { getProfile, getProfileById, editProfileById } from "../controller/userController.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// User routes
router.post('/createUser', createUser);
router.get('/getUser', getUser);
router.get('/getUserById/:id', getUserById);
router.put('/editUserById/:id', editUserById);
router.delete('/deleteUserById/:id', deleteUserById);


router.get('/getProfile', getProfile);
router.get('/getProfileById/:id', getProfileById);
router.put('/editProfileById/:id', editProfileById);


//role routes

router.post('/roles', createRole);
router.get('/roles', getRoles);
router.get('/roles/:id', getRoleById);
router.put('/roles/:id', updateRoleById); 
router.delete('/roles/:id', deleteRoleById);


export default router;
