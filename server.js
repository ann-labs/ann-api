import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// serve folder public
app.use(express.static(path.join(process.cwd(), "public")));

// optional: route API
import endpointsRouter from "./api/endpoints.js";
app.use("/api/endpoints", endpointsRouter);

app.get("/api/status", (req, res) => {
  res.json({ status: "online" });
});

// catch-all untuk SPA / fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});