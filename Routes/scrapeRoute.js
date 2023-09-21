require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const router = express.Router();
const News = require("../Models/News");
async function scrapeWebsite(url, selector) {
  try {
    const response = await axios.get(url);
    const parsedUrl = new URL(url);
    const domain = parsedUrl.hostname;
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const articleTitles = [];

      $(selector).each((index, element) => {
        if (
          domain === "ekantipur.com" ||
          domain === "nagariknews.nagariknetwork.com"
        ) {
          articleTitles.push({
            source: domain,
            link: `https://` + domain + $(element).attr("href"),
            news: $(element).text(),
          });
        } else {
          articleTitles.push({
            source: domain,
            link: $(element).attr("href"),
            news: $(element).text().trim(),
          });
        }
      });
      const newsArticle = articleTitles.slice(0, 1);
      newsArticle.forEach((element) => {
        console.log(element);
      });
      newsArticle.forEach(async (newsItem) => {
        try {
          if (newsItem.news.length !== 0) {
            const existingNews = await News.findOne({ news: newsItem.news });
            if (!existingNews) {
              const newsItem1 = new News(newsItem);
              await newsItem1.save();
              console.log("Saved:", newsItem1);
            } else {
              console.log("News already exists in the database");
            }
          }
        } catch (error) {
          console.error("Error saving news item:", error);
        }
      });
    } else {
      console.error("Failed to fetch the web page");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

router.get("/", async (req, res) => {
  try {
    await scrapeWebsite(
      "https://www.onlinekhabar.com/content/news",
      ".post-title-wrap h4 a:last-child"
    );
    //await scrapeWebsite("https://ekantipur.com/news", ".teaser h2 a");
    await scrapeWebsite("https://www.setopati.com/", ".breaking-news-item a");
    await scrapeWebsite(
      "https://nagariknews.nagariknetwork.com/",
      ".article_template h1 a"
    );

    await scrapeWebsite(
      "https://ronbpost.com",
      ".bg-white .text-center .font-mukta a"
    );
    console.log("Scraping completed successfully");
    res.redirect("/");
  } catch (error) {
    console.error("Error:", error);
  }
});
module.exports = router;
