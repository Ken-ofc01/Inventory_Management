// This is the model for the database for an instance of User. 
// The Schema determines what the properties of the user is going to be
// Future me  Please understand this shit.



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