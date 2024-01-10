import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";

const connectToDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    throw new ApiError(500, "Database connection error", [], error.stack);
  }
};

export { connectToDb };
