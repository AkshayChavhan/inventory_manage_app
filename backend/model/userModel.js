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
        // trim:true ,
        minlength : [ 6 , "Please enter the password with minimum 6 character"] ,
        maxlength : [ 20 , "Please enter the password with maximum 20 character"],
        match : [
            /^[a-zA-Z0-9!@#$%^&*]{6,16}$/ , "Please enter the correct password"
        ]
    },
    photo : {
        type : String ,
        required :true ,
        default : ""
    },
    phone: {
        type : String ,
        required : [ true ],
        minlength : [ 10 , "Please enter the password with minimum 10 number"] ,
        maxlength : [ 13 , "Please enter the password with maximum 12 number"],
        default : "+91"
    },
    bio: {
        type : String ,
        required : false,
        minlength : [ 50 , "Please enter the password with minimum 50 character"] ,
        maxlength : [ 100 , "Please enter the password with maximum 100 character"]
    }
},{
    timestamps:true
})

const User = mongoose.model("User", userSchema);

module.exports = User