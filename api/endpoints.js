import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    base_url: "/api",
    endpoints: [
      {
        method: "GET",
        path: "/api/status",
        description: "Check API status"
      },
      {
        method: "GET",
        path: "/api/endpoints",
        description: "List all available endpoints"
      },
      {
        method: "GET",
        path: "/api/hentai",
        description: "Get latest hentai data"
      }
    ]
  });
});

export default router;