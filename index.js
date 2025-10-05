import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow requests from your Vercel frontend
app.use(
  cors({
    origin: "https://math-iq-repo.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());
