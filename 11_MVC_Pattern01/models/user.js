const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    pincode:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
    }

});

//model

const User = mongoose.model("userDetails",userSchema)

module.exports= User;