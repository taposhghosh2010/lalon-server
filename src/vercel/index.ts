import mongoose from "mongoose";
import ServerlessHttp from "serverless-http";
import app from "../app";
import connectDB from "../db/dbConnection";

// Vercel serverless function handler
// This function will be called by Vercel when a request is made to the serverless function
// export default async function handler(req: Request, res: Response) {
//     // Check the MongoDB connection status by inspecting mongoose.connection.readyState
//     if (mongoose.connection.readyState === 0) {  // 0 means disconnected
//         try {
//             await connectDB();  // This will attempt to connect MongoDB
//             console.log("MongoDB Connected inside Vercel function!");
//         } catch (error) {
//             console.error("MongoDB connection failed:", error);
//             return res.status(500).json({ message: "Database connection failed" });
//         }
//     }

//     res.status(200).json({ message: "Hello from Vercel serverless!" });
//     // Now pass the request to the Express app
//     app(req, res);  // Vercel-specific, but make sure app is set up correctly
// }

// Ensure MongoDB is connected
if (mongoose.connection.readyState === 0) {
    connectDB()
        .then(() => console.log("MongoDB Connected inside Vercel function!"))
        .catch((err) => console.error("MongoDB connection failed:", err));
}

// Wrap Express app with serverless-http
export const handler = ServerlessHttp(app);
