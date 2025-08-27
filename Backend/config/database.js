import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Database not connected", error.message);
  }
};

export default connectDb;
