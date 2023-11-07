import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

// connecting to the database
connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        console.log(reqBody)

        //check is user exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User not found"},{status:400})
        }

        // check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if (!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }

        // creating JWT 
        const tokenData= {
            id : user.id,
            username : user.username,
            email : user.email
        }
        const token= await jwt.sign(tokenData. process.env.TOKEN_SECRET,{expiresIn:"1h"})

        const response = NextResponse.json({
            message:"successful",
            success: true
        })
        response.cookies.set("token",token,{
            httpOnly:true,
            })
            return response;
            
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}