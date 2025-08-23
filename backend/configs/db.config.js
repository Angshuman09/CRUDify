import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const db = async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGO_URL}/Product_store`);
       console.log("Mongodb is connected");
    } catch (error) {
        console.log("Error is happening: ",error.message);
        process.exit(1) // 1 is for error and 0 is for success
    }
}