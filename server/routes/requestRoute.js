import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  getAllRequests,
  sendRequest,
  updateRequestStatus,
} from "../controllers/requestController";

const router = express.Router();
//Get all requests for a user
router.get("/get-all-requests", authMiddleware, getAllRequests);

//Send request to another user
router.post("/send-request", authMiddleware, sendRequest);

//Update Request Status
router.post("/update-request-status", authMiddleware, updateRequestStatus);

export default router;
