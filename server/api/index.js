import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.js";
import userRoutes from "../routes/user.js";
import categoryRoutes from "../routes/category.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // allow cookies
  })
);
app.use(hpp());
// app.use(xss());

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);

export default app;
