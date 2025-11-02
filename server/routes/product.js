import express from "express";
import protect from "../middlewares/protect.js";
import admin from "../middlewares/admin.js";
import { createUpdateLimiter } from "../middlewares/limiter.js";
import { createProduct } from "../controllers/productController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post(
  "/",
  createUpdateLimiter,
  protect,
  admin,
  upload.array("images", 10),
  createProduct
);

export default router;
