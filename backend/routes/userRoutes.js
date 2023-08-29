const express = require("express");
const router = express.Router();
const { registerUser , loginUser , logoutUser , getUser , loginStatus , updateUser , changePassword ,forgotPassword } = require("../controller/userController");
const authMiddleware = require("../authMiddleware/authMiddleware");


router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/getuser" , authMiddleware , getUser)
router.get("/loggedin" , loginStatus)
router.patch("/updateuser" , authMiddleware , updateUser)
router.patch("/changepassword" , authMiddleware , changePassword)
router.post("/forgotpassword" , authMiddleware , forgotPassword)

module.exports =  router 