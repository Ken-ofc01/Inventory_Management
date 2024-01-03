/*
This is the default implementation of connecting the database to this app 
The function of this is to just connect the whole app to the database so 
We could just call this function anywhere in the app and connect it to the database



*/

import mongoose from "mongoose";
export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on('connected',() =>{
            console.log("mongoDB connected")
        })
        connection.on('error',(err) =>{
            console.log("mongoDB could not be connected"+ err);
            process.exit();
        })
    }
    catch (error) {
        console.log(error)
    }
}