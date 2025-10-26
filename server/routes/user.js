import express from "express";
import protect from "../middlewares/protect.js";
import admin from "../middlewares/admin.js";
import {
  getAllUsers,
  deleteUser,
  getMe,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/dashboard-users", protect, admin, getAllUsers);
router.get("/get-me", protect, getMe);

router.put("/update-user/:id", protect, admin, updateUser);

router.delete("/:id", protect, admin, deleteUser);

export default router;
