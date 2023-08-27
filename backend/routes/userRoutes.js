const express = require("express");
const router = express.Router();
const { registerUser , loginUser , logoutUser , getUser } = require("../controller/userController");
const authMiddleware = require("../authMiddleware/authMiddleware");


router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/getuser" , authMiddleware , getUser)

module.exports =  router 