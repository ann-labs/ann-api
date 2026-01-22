import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import hentaiRoute from "./routes/hentai.js"
import endpointsRoute from "./routes/endpoints.js";;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/status", (req, res) => {
    res.json({ status: "online" });
});
app.use("/api/endpoints", endpointsRoute);

app.use("/api/hentai", hentaiRoute);

app.listen(PORT, () => {
    console.log(`Local server running at http://localhost:${PORT}`);
});
