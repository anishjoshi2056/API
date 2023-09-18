const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  news: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
