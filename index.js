// index.js
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

// 🩵 Health check route
app.get("/", (req, res) => {
  res.send("✅ Math IQ Battle backend is running successfully!");
});

// 🧠 Dummy Authentication Routes (for testing)
app.post("/api/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log("Register request:", { username, email, password });
  res.json({ message: `User ${username} registered successfully!` });
});

app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login request:", { username, password });
  res.json({ message: `Welcome back, ${username}!` });
});

// 🧩 Test route to confirm CORS works
app.get("/api/test", (req, res) => {
  res.json({ message: "CORS test successful 🎯" });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Math IQ Battle server running on port ${PORT}`);
});
