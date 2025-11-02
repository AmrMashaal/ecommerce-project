import express from "express";
import protect from "../middlewares/protect.js";
import admin from "../middlewares/admin.js";
import {
  generalLimiter,
  createUpdateLimiter,
  deleteLimiter,
  searchLimiter,
  browseLimiter,
} from "../middlewares/limiter.js";

const router = express.Router();

router.get("/", browseLimiter, getProducts);

