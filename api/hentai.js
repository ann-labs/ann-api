// /api/hentai.js
import axios from "axios";
import * as cheerio from "cheerio";

export const config = {
  runtime: "nodejs",
};

const URL = "https://nekopoi.care/category/hentai/";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export default async function handler(req, res) {
  try {
    const { data: html } = await axios.get(URL, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
        Referer: URL,
      },
      timeout: 15000,
      validateStatus: () => true,
    });

    if (!html || html.length < 1000) {
      return res.status(403).json({
        status: false,
        message: "Blocked by source",
        data: [],
      });
    }

    const $ = cheerio.load(html);
    const results = [];

    $("div.result > ul > li").each((i, el) => {
      if (results.length >= 10) return false;

      const item = $(el);
      const title = item.find("h2 a").text().trim();
      const link = item.find("h2 a").attr("href");
      const poster = item.find("img.wp-post-image").attr("src");

      if (!title || !link) return;

      results.push({ title, link, poster });
    });

    res.status(200).json({
      status: true,
      count: results.length,
      data: results,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}