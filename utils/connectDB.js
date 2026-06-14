import mongoose from "mongoose";

export default async function connectDB() {
  try {
    if (mongoose.connections[0].readyState) return true;
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB");
    return true;
  } catch (err) {
    console.log("Can't connect to DB");
    return false;
  }
}
