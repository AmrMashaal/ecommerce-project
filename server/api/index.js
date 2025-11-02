import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import authRoutes from "../routes/auth.js";
import userRoutes from "../routes/user.js";
import categoryRoutes from "../routes/category.js";
import productRoutes from "../routes/product.js";

dotenv.config();

const app = express();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "Too many requests from this IP. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(hpp());
// app.use(xss());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));

app.use(globalLimiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);

export default app;
