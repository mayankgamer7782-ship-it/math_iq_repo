const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "https://math-iq-repo.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
