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
import { getUser, getUserById, editUserById, deleteUserById } from "../controller/userController.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// User routes
router.get('/getUser', getUser);
router.get('/getUserById/:id', getUserById);
router.put('/editUserById/:id', editUserById);
router.delete('/deleteUserById/:id', deleteUserById);

export default router;
