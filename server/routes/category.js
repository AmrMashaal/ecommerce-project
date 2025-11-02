import express from "express";
import protect from "../middlewares/protect.js";
import admin from "../middlewares/admin.js";
import { browseLimiter, createUpdateLimiter } from "../middlewares/limiter.js";
import {
  getCategories,
  addCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", browseLimiter, getCategories);

router.post("/", protect, admin, createUpdateLimiter, addCategory);

export default router;
