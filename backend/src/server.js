import express from "express"
import { connectDB} from "./config/db.js"
import cookieParser from "cookie-parser";
import rateLimiter from "../src/middleware/rateLimiter.js"
import authRoutes from './routes/authRoute.js';
import transactionsRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js"
import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(rateLimiter)
app.use(express.json())
app.use(cookieParser());

// if (process.env.NODE_ENV !== "production") {
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));
// }

// if(process.env.NODE_ENV==="production"){
//     job.start()
// }
const PORT = process.env.PORT || 5001

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "okay" });
});

app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionsRoute);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT}`)
    })
}) 