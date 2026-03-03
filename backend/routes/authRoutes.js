import { Router } from "express";
import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  getEnrolledStudents,
  exportStudentsCSV,
} from "../controllers/authController.js";
import { protect, teacherOnly } from "../middleware/auth.js"

const router = Router();

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", protect, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/students", protect, teacherOnly, getEnrolledStudents);
router.get("/export-students", protect, teacherOnly, exportStudentsCSV);

export default router;
