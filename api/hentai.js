// services/hentai.js
import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://nekopoi.care/category/hentai/";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export async function hentai() {
  try {
    const { data: html } = await axios.get(URL, {
      headers: {
        "User-Agent": UA,
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
        Referer: URL,
      },
      timeout: 15000,
    });

    const $ = cheerio.load(html);
    const results = [];

    $("div.result > ul > li").each((i, el) => {
      if (results.length >= 10) return false;

      const item = $(el);
      const desc = item.find(".desc");

      const title = item.find("h2 a").text().trim();
      const link = item.find("h2 a").attr("href");
      const poster = item.find("img.wp-post-image").attr("src");

      if (!title || !link) return;

      const sinopsis = desc
        .find("p")
        .filter((_, p) =>
          $(p).prev().text().toLowerCase().includes("sinopsis")
        )
        .first()
        .text()
        .trim();

      const genre = desc
        .find('p:contains("Genre")')
        .text()
        .replace(/Genre\s*:\s*/i, "")
        .trim();

      const produser = desc
        .find('p:contains("Producers")')
        .text()
        .replace(/Producers\s*:\s*/i, "")
        .trim();

      const durasi = desc
        .find('p:contains("Duration")')
        .text()
        .replace(/Duration\s*:\s*/i, "")
        .trim();

      const size = desc
        .find('p:contains("Size")')
        .text()
        .replace(/Size\s*:\s*/i, "")
        .trim();

      results.push({
        title,
        link,
        poster,
        sinopsis,
        genre,
        produser,
        durasi,
        size,
      });
    });

    return {
      status: true,
      message: "Success",
      count: results.length,
      source: "nekopoi.care",
      timestamp: Date.now(),
      data: results,
    };
  } catch (err) {
    return {
      status: false,
      message: err.message || "Failed to fetch data",
      count: 0,
      data: [],
    };
  }
}
