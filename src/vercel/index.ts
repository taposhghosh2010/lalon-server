import mongoose from "mongoose";
import ServerlessHttp from "serverless-http";
import app from "../app";
import connectDB from "../db/dbConnection";
import { Request, Response } from "express";

// Vercel serverless function handler
export default async function handler(req:Request, res:Response) {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 0) {
        try {
            await connectDB();
            console.log("MongoDB Connected inside Vercel function!");
        } catch (error) {
            console.error("MongoDB connection failed:", error);
            return res.status(500).json({ message: "Database connection failed" });
        }
    }

    // Wrap the Express app with serverless-http inside the handler
    const serverlessApp = ServerlessHttp(app);
    // Pass the request and response to the serverlessApp
    return serverlessApp(req, res);
}

