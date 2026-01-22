import express from "express";
import { getHentai } from "../controllers/hentai.js";

const router = express.Router();

router.get("/", getHentai);

export default router;
