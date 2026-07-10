import express from "express";
import {createTransaction,updateTransaction,deleteTransaction,getUserSummary,getAllTransactions,} from "../controllers/transactionsController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getAllTransactions);
router.post("/", createTransaction);
router.delete("/:id", deleteTransaction);
router.put("/:id", updateTransaction);
router.get("/:id", getUserSummary);

export default router;