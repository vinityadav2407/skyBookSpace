import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Databse connected to host ${conn.connection.host}`);
  } catch (error) {
    console.log(`error connecting to the database`, error);
    process.exit(1);
  }
};
