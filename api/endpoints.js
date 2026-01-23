export default function handler(req, res) {
  res.status(200).json({
    base_url: "/api",
    endpoints: [
      { method: "GET", path: "/api/status", description: "Check API status" },
      { method: "GET", path: "/api/endpoints", description: "List all available endpoints" },
      { method: "GET", path: "/api/hentai", description: "Get latest hentai data" }
    ]
  });
}