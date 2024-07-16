import express from "express";
import {
  register,
  login,
  getUserInfo,
  getAllUsers,
  updateUserVerifiedStatus,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-all-users", authMiddleware, getAllUsers);
router.get("/get-user-info", authMiddleware, getUserInfo);
router.post(
  "/update-verified-status",
  authMiddleware,
  updateUserVerifiedStatus
);

export default router;
