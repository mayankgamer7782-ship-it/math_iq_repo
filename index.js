// index.js
import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow all origins for now (fixes CORS/network errors)
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// 🟢 Health check
app.get("/", (req, res) => {
  res.send("✅ Math IQ Battle backend is running successfully!");
});

// 🧠 Dummy authentication routes
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

// 🧩 Debug route to confirm CORS & network
app.all("/debug", (req, res) => {
  res.json({
    method: req.method,
    headers: req.headers,
    body: req.body,
    message: "Server reachable ✅",
  });
});

// ✅ Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Math IQ Battle server running on port ${PORT}`);
});
