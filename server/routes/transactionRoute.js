import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import {
  depositFunds,
  getAllTransations,
  transferFund,
  verifyAccount,
} from "../controllers/transactionController";

const router = express.Router();

//Transfer money from one account to another
router.post("/transfer-fund", authMiddleware, transferFund);

//Verify receiver's account number
router.post("/verify-account", authMiddleware, verifyAccount);

//Get all transactions of a user
router.get("/get-all-transactions", authMiddleware, getAllTransations);

//Deposit funds using stripe
router.post("/deposit-fund", authMiddleware, depositFunds);

export default router;
