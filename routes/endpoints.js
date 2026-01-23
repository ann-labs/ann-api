export default function handler(req, res) {
  res.status(200).json({
    endpoints: [
      { method: "GET", path: "/api/status" },
      { method: "GET", path: "/api/endpoints" },
      { method: "GET", path: "/api/hentai" }
    ]
  });
}