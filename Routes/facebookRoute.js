require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const News = require("../Models/News");

async function postNewsToFacebook(message) {
  //const facebookUrl = `https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/photos`;
  const facebookUrl = `https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/feed`;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;
  message = `Latest News Updates - ${formatDate()} \n\n${message}`;

  const data = {
    //caption
    message,
    access_token: accessToken,
  };

  return axios.post(facebookUrl, data);
}
function formatDate() {
  const currentTime = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return currentTime.toLocaleString("en-US", options);
}
router.get("/", async (req, res) => {
  try {
    // Fetch news from the database
    const latestNews = await News.find({}).sort({ createdAt: -1 }).limit(4);
    // Transform news into a formatted string
    const combinedNews = latestNews
      .map((element, index) => {
        return `${index + 1}: ${element.news}\n${element.link}\n\n`;
      })
      .join("");

    // Add a caption to the news
    const caption = `${combinedNews}`;

    // Post the news with caption to Facebook
    const facebookResponse = await postNewsToFacebook(caption);
    console.log("Automatic POST request triggered:", facebookResponse.data);
    // Delete the three latest news items from the database
    const deletedNews = await News.deleteMany({
      _id: { $in: latestNews.map((news) => news._id) },
    });

    console.log("Deleted news items:", deletedNews);
    res.redirect("/");
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

module.exports = router;
