const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true , "Please enter the User Name"],
    },
    email: {
        type: String,
        required: [true , "Please enter the User email"],
        unique : true ,
        trim:true ,
        match : [
            /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "Please enter the correct email id"
        ]
    },
    password: {
        type: String,
        required: [true , "Please enter the User Password"],
        minlength : [ 6 , "Please enter the password with minimum 6 character"] ,
        maxlength : [ 20 , "Please enter the password with maximum 20 character"],
        match : [
            /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ , "Please enter the correct password"
        ]
    },
    photo : {
        type : String ,
        required : true , 
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2F&psig=AOvVaw0sVQBhGLz-nChaA4lppEue&ust=1693143501295000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPjX2re5-oADFQAAAAAdAAAAABAI"
    },
    phone: {
        type : String ,
        required : true , 
        default : "91",
    },
    bio: {
        type : String ,
        required : false,
        minlength : [ 50 , "Please enter the bio with minimum 50 character"] ,
        maxlength : [ 100 , "Please enter the bio with maximum 100 character"]
    }
},{
    timestamps:true
})

const User = mongoose.model("User", userSchema);

module.exports = User