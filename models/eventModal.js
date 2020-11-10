const mongoose = require("mongoose");
const eventRegisteration = new mongoose.Schema({
  name: String,
  date: {
    type: String,
    default: new Date(),
  },
  claps: { type: String, default: 0 },
  comments: { type: Array, default: [] },
  subject: String,
  blog: String,
likes: { type: Array, default: [] },
  userId: String});

const eventModel = mongoose.model("eventModel", eventRegisteration);

module.exports = eventModel;
