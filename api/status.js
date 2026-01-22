export default function handler(req, res) {
  res.status(200).json({
    status: "online",
    version: "1.0.0"
  });
}