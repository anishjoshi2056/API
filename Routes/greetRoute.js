require("dotenv").config();
const axios = require("axios");
const express = require("express");
const router = express.Router();
const Greeting = require("../Models/Greeting");

async function postNewsToFacebook(message) {
  //const facebookUrl = `https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/photos`;
  const facebookUrl = `https://graph.facebook.com/${process.env.FACEBOOK_PAGE_ID}/feed`;
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  const data = {
    //caption
    message,
    access_token: accessToken,
  };

  return axios.post(facebookUrl, data);
}

router.get("/", async (req, res) => {
  try {
    // Get the current time
    const currentTime = new Date();

    // Define a time range for "morning" (e.g., 7 AM)
    const morningStartTime = new Date(currentTime);
    morningStartTime.setHours(7, 0, 0, 0); // Set to 7:00:00 AM

    // Check if the current time is before 7 AM
    if (currentTime < morningStartTime) {
      // If it's before 7 AM, fetch a random morning greeting
      randomGreeting = await Greeting.aggregate([
        {
          $match: {
            greetingType: "morning",
          },
        },
        { $sample: { size: 1 } }, // Select one random document
      ]);
      // Post the news with caption to Facebook
      let message = randomGreeting[0].content;
      const facebookResponse = await postNewsToFacebook(message);
      console.log("Automatic POST request triggered:", facebookResponse.data);
      res.redirect("/");
    } else {
      // If it's 7 AM or later, fetch an evening greeting
      randomGreeting = await Greeting.aggregate([
        {
          $match: {
            greetingType: "night",
          },
        },
        { $sample: { size: 1 } }, // Select one random document
      ]);
      // Post the news with caption to Facebook
      let message = randomGreeting[0].content;
      const facebookResponse = await postNewsToFacebook(message);
      console.log("Automatic POST request triggered:", facebookResponse.data);
      res.redirect("/");
    }
  } catch (error) {
    // Handle any errors and respond with an error message
    console.error(error);
  }
});

module.exports = router;
