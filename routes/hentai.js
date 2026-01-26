import express from "express";
import { hentai } from "../controllers/hentai.js"

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await hentai();

  if (!result.status) {
    return res.status(500).json(result);
  }

  res.json(result);
});

export default router;
