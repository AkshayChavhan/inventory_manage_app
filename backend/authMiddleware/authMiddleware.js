const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwtToken = require("jsonwebtoken");

const authMiddleware = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // token validation
        if (!token) {
            res.status(400)
            throw new Error("TOken expired.Please log in again.")
        }

        // token verification
        const verifyToken = jwtToken.verify(token, process.env.JWT_SECRET);

        if (!verifyToken) {
            res.status(400)
            throw new Error("Unauthorised access.")
        }

        const user = await User.findById(verifyToken.id).select("-password");

        if(!user){
            res.status(400)
            throw new Error("User not found.")
        }

        req.user = user ;
        next();
    } catch (error) {
        res.status(400)
        throw new Error("Unauthorised login.")
    }
});

module.exports = authMiddleware;