import express from "express";
import {createTransaction,deleteTransaction,getSummaryByUserId,getTransactionsByUserId,} from "../controllers/transactionsController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.use(protectRoute);

router.get("/:userId", getTransactionsByUserId);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.get("/summary/:userId", getSummaryByUserId);

export default router;