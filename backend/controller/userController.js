const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const jwtToken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../model/token");
const crypto = require("crypto");



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
    } else {
        res.status(400)
        throw new Error("Invalid user email or password.");
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    // cleaning HTTP-only cookie
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: 0,  //1 Day
        sameSite: "none",
        secure: false,
    });
    res.status(200).json({ message: "Log out successfully." })
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {

        const { _id, name, email, photo, phone, bio } = user

        res.status(201).json({
            _id, name, email, photo, phone, bio
        })
    } else {
        res.status(400);
        throw new Error("User not found");
    }
})

const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        res.json(false);
        throw new Error('You are unauthorized to access this resource');
    }

    // token verification
    const verifyToken = jwtToken.verify(token, process.env.JWT_SECRET);

    if (verifyToken) {
        res.json(true);
    }
    res.json(false);

})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }

    const { name, email, photo, phone } = user;
    user.email = email;
    user.name = req.user.name || name;
    user.photo = req.user.photo || photo;
    user.phone = req.user.phone || phone;

    const updateUserData = await user.save();
    res.status(200).json({
        _id: updateUserData._id,
        name: updateUserData.name,
        email: updateUserData.email,
        photo: updateUserData.photo,
        phone: updateUserData.phone
    })
})

const changePassword = asyncHandler(async (req, res) => {
    const { password, newPassword } = req.body;
    if (!password && !newPassword) {
        res.status(400)
        throw new Error("All inputs required");
    }
    if (password === newPassword) {
        res.status(400)
        throw new Error("New and Old password should not be same.");
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(400)
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password , user.password);
    if(isPasswordValid){
        user.password = password ;
        await user.save();
        res.status(200).json({
            message : `Password changed sucessfully.`
        })
    }else{
        res.status(400)
        throw new Error("Old Password is incorrect.")
    }
})


const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(404)
        throw  new Error('Email doesnot exist');
    }
    
    //create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id 
    const hashedToken = crypto.createHash("sha1").update(resetToken).digest("hex");

    console.log("resetToken => ",hashedToken);
    res.send("done")
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    changePassword ,
    forgotPassword
};
