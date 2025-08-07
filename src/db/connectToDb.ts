import { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw new Error("Database connection failed");
  }
};
