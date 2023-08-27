const express = require("express");
const router = express.Router();
const { registerUser , loginUser , logoutUser , getUser } = require("../controller/userController");


router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.post("/logout" , logoutUser);
router.get("/getuser" , getUser)

module.exports =  router 