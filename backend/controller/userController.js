const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



const generateToken = (id) => {
    return jwtToken.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400)
        throw new Error(`Please enter the required field like ${name},${email} and ${password}`);
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Please enter minimum 6 character in password");
    }
    if (password.length > 23) {
        res.status(400)
        throw new Error("Please enter maximum 23 character in password");
    }

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
        res.status(400)
        throw new Error("Email has already been registered");
    }


    // create new user
    const user = await User.create({
        name, email, password
    })

    // create token
    const token = generateToken(user._id);


    // send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),  //1 Day
        sameSite: "none",
        secure: false,
    })



    if (user) {
        const { _id, name, email, photo, phone, bio } = user;
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    } else {
        res.status(400)
        throw new Error("Something went wrong while creating a new user")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please enter the Email and Password.")
    }

    const isEmailExist = await User.findOne({ email });

    if (!isEmailExist) {
        res.status(400)
        throw new Error("User does not exist ,please signup first.");
    }

    const isPasswordCorrect = await bcrypt.compare(password, isEmailExist.password);

    // create token
    const token = await generateToken(isEmailExist._id);

    // send HTTP-only cookie
    res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),  //1 Day
        sameSite: "none",
        secure: false,
    })

    if (isEmailExist && isPasswordCorrect) {
        const { _id, name, email, photo, phone, bio } = isEmailExist;
        res.status(201).json({
            _id, name, email, photo, phone, bio, token
        })
    }else {
        res.status(400)
        throw new Error("Invalid user email or password.");
    }
})

const logoutUser = asyncHandler(async(req,res) => {
    res.send("Log ROuter");
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
