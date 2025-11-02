import express from "express";
import protect from "../middlewares/protect.js";
import admin from "../middlewares/admin.js";
import {
  adminLimiter,
  generalLimiter,
  createUpdateLimiter,
  deleteLimiter,
} from "../middlewares/limiter.js";
import {
  getAllUsers,
  deleteUser,
  getMe,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard-users", protect, admin, adminLimiter, getAllUsers);
router.get("/get-me", protect, generalLimiter, getMe);

router.put("/update-user/:id", protect, admin, createUpdateLimiter, updateUser);

router.delete("/:id", protect, admin, deleteLimiter, deleteUser);

export default router;
