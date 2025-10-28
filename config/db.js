import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', ()=> console.log('Database Connected'));
       // await mongoose.connect(`${process.env.MONGODB_URI}/notes-app`)
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "notes-app", // ✅ safer than appending to URI
    });

    
    console.log("✅ MongoDB connected");
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

