import mongoose from "mongoose";
let isConnected;
export const connectMongoDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log("Erro connecting to database: ", error);
  }
};
