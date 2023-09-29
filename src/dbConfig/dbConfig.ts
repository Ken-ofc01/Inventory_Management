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