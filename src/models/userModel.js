import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "Please Provide Your Full Name"]
    },
    email:{
        type: String,
        required: [true, "Please Provide Your Full Name"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please Provide Your Password"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyTokenExpiry: Date,

})
const User = mongoose.model.users || mongoose.model(
    "users", userSchema
);
export default User;