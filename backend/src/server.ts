import express from "express";
import rateLimit from "express-rate-limit";
import weatherRouter from "./routes/weather";

const app = express();

const limiter = rateLimit({
  windowMs: 300 * 1000,
  max: 20,
  message: '{"message": "Too many requests"}',
});

app.use(limiter);

// Routes
app.use("/api", weatherRouter);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
