const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler( async (req,res) => {
    const { name , email , password } = req.body ;
    console.log("name , email , password =>", name , email , password);
    if(!name || !email || !password){
        res.status(400)
        throw new Error(`Please enter the required field like ${name},${email} and ${password}`);
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("Please enter minimum 6 character in password");
    }
    if(password.length > 23){
        res.status(400)
        throw new Error("Please enter maximum 23 character in password");
    }

    const isEmailExist = await User.findOne({ email });

    if(isEmailExist){
        res.status(400)
        throw new Error("Email has already been registered");
    }


    // create new user
    const user = await User.create({
        name ,email, password
    })

    if(user){
        const { _id , name , email ,photo , phone ,bio } = user ;
        res.status(201).json({
            _id , name , email ,photo , phone ,bio
        })
    }else{
        res.status(400)
        throw new Error("Something went wrong while creating a new user")
    }
})

module.exports = {
    registerUser
};
