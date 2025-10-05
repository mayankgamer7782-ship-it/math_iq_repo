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

// 🧠 Example route — you can replace or expand this
app.get("/", (req, res) => {
  res.send("✅ Math IQ Battle server is live and connected!");
});

// (If you have routes for login/register, import and use them here)
// import authRoutes from "./routes/auth.js";
// app.use("/api/auth", authRoutes);

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Math IQ Battle server running on port ${PORT}`);
});
