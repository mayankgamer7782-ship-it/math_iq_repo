import express from "express";
import cors from "cors";

const app = express();

// TEMPORARY: allow all origins for quick debug
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
// ... your routes ...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

