import express from "express";
import { authLimiter } from "../middlewares/limiter.js";
import {
  signup,
  signupValidate,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/validate-signup", authLimiter, signupValidate);

router.post("/login", authLimiter, login);
router.post("/logout", authLimiter, logout);

router.post("/refresh-token", authLimiter, refreshToken);

export default router;
