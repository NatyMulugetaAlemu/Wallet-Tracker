import express from "express"
import "dotenv/config"
import { initDB} from "./config/db.js"
import rateLimiter from "../middleware/rateLimiter.js"
import transactionsRoute from "./routes/transactionsRoute.js"
// import job from "./config/cron.js"

const app = express()

app.use(rateLimiter)
app.use(express.json())

// if(process.env.NODE_ENV === "production")job.start()

const PORT = process.env.PORT || 5001

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "okay" });
});

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT:${PORT}`)
    })
}) 