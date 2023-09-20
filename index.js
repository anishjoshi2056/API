const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Greeting = require("./Models/Greeting");

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Importing Routes
const scrapeRoute = require("./Routes/scrapeRoute");
const facebookRoute = require("./Routes/facebookRoute");
const greetRoute = require("./Routes/greetRoute");

// Connection to Database

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_ATLAS_USERNAME}:${process.env.MONGODB_ATLAS_PASSWORD}@projects.f7s6vqh.mongodb.net/${process.env.MONGODB_ATLAS_COLLECTION}`;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Nepali Web Scraper and Facebook Publisher API");
});

app.use("/facebook", facebookRoute);
app.use("/scrape", scrapeRoute);
app.use("/greet", greetRoute);
