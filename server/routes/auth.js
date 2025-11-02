import express from "express";
import {
  authLimiter,
  generalLimiter,
  emailLimiter,
} from "../middlewares/limiter.js";
import {
  signup,
  signupValidate,
  login,
  refreshToken,
  logout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", emailLimiter, signup);
router.post("/validate-signup", authLimiter, signupValidate);

router.post("/login", authLimiter, login);
router.post("/logout", generalLimiter, logout);

router.post("/refresh-token", generalLimiter, refreshToken);

export default router;
