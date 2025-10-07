import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow requests from both possible frontend URLs
app.use(
  cors({
    origin: [
      "https://math-iq-repo.vercel.app",
      "https://math-iq-repo-git-master-mayanks-projects-7ac8f4f8.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware to parse JSON
app.use(express.json());

// Simple health check route
app.get("/", (req, res) => {
  res.json({ message: "Server reachable ✅" });
});

// --- Example auth routes (you probably have real ones below this) ---
app.post("/api/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log("Register request:", { username, email });
  return res.json({ ok: true, message: "Registered successfully" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Login request:", { email });
  return res.json({ ok: true, message: "Logged in successfully" });
});

// --- Start server ---
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Math IQ Battle server running on port ${PORT}`);
});
