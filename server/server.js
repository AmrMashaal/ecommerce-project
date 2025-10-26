import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./api/index.js";
import http from "http";
import User from "./models/User.js";
dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 3005;

const serverConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY);

    server.listen(PORT, () => {
      if (process.env.NODE_ENV === "development") {
        console.log(`Server listening on port ${PORT}...`);
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error connecting to MongoDB:", error);
    }
  }
};

serverConnection();
