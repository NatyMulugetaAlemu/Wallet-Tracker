import express from 'express';
import { checkAuth, login, logout, signup, verifyEmail,} from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js';


const router = express.Router();

router.post("/signup",signup)

router.post("/verify-email", verifyEmail);

router.post("/login",login)

router.post("/logout",logout)

router.get("/check", protectRoute, checkAuth);

export default router;