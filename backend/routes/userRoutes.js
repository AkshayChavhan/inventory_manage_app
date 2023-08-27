const express = require("express");
const router = express.Router();
const { registerUser , loginUser , logoutUser , getUser , loginStatus , updateUser } = require("../controller/userController");
const authMiddleware = require("../authMiddleware/authMiddleware");


router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/getuser" , authMiddleware , getUser)
router.get("/loggedin" , loginStatus)
router.patch("/updateuser" , updateUser)

module.exports =  router 