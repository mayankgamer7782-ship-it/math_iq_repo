import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow your Vercel frontend
app.use(
  cors({
    origin: [
      "https://https://math-iq-repo.vercel.app",
      "https://math-iq-repo-git-master-mayanks-projects-7ac8f4f8.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Health check
app.get("/", (req, res) => {
  res.json({ message: "Server reachable ✅" });
});

// ✅ Simple user routes to prevent 404 errors
let mockUser = null;

// Register
app.post("/api/auth/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: "Missing fields" });
  mockUser = { username, email };
  console.log("🟢 Registered user:", mockUser);
  res.json({ ok: true, message: "Registered successfully", user: mockUser });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!mockUser || mockUser.email !== email)
    return res.status(401).json({ error: "Invalid credentials" });
  res.json({ ok: true, message: "Logged in successfully", user: mockUser });
});

// User info
app.get("/api/user/me", (req, res) => {
  if (!mockUser)
    return res.status(401).json({ error: "Not logged in" });
  res.json({ user: mockUser });
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Math IQ Battle server running on port ${PORT}`);
});
