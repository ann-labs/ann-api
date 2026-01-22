import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    endpoints: [
      { method: "GET", path: "/api/status" },
      { method: "GET", path: "/api/endpoints" },
      { method: "GET", path: "/api/hentai" }
    ]
  });
});

export default router;