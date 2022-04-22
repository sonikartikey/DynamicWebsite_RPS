const mongoose = require('mongoose');
const validator = require('validator');

const userEnquirySchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please check your email")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min:10
    },
    message:{
        type:String,
        required:true,
        minlength:3
    },
    date:{
        type:Date,
        default:Date.now
    }
})

//we need to create a collection
const UserEnquiry = new mongoose.model("UserEnquiry" , userEnquirySchema)

module.exports = UserEnquiry