// import mongoose from 'mongoose';

// export const connectDB = async () => {
//     try {
//         mongoose.connection.on('connected', ()=> console.log('Database Connected'));
//         await mongoose.connect(`${process.env.MONGODB_URI}/notes-app`)
//     } catch(error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME || "vercelapp"
    });
    isConnected = conn.connections[0].readyState;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};