import express from "express";
import { hentai } from "../controllers/hentai.js"

export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  const result = await hentai();

  if (!result.status) {
    return res.status(500).json(result);
  }

  res.status(200).json(result);
}
