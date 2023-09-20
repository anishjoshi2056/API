const mongoose = require("mongoose");

const greetingSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  greetingType: {
    type: String,
    enum: ["morning", "night"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Greeting = mongoose.model("Greeting", greetingSchema);

module.exports = Greeting;
