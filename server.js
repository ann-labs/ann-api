import express from "express";
import path from "path";
import endpointsRouter from "./api/endpoints.js";

const app = express();

// Serve static public folder
app.use(express.static(path.join(process.cwd(), "public")));

// API routes
app.use("/api/endpoints", endpointsRouter);

app.get("/api/status", (req, res) => {
  res.json({ status: "online" });
});

// Catch-all untuk SPA / index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/index.html"));
});

// **export default app supaya Vercel bisa handle serverless**
export default app;