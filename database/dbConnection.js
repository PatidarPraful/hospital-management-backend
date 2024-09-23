import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(
        process.env.MONGO_URI , {
            dbName : "hospital_management"
        }
    )
    .then(()=>{
        console.log("database connected");
        
   }).catch((err)=>{
    console.log(`some error occured ${err}`);
   });
}