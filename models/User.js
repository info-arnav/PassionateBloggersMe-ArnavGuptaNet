const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  biology: { type: String, default: "" },
  instagram: { type: String, default: "" },
  facebook: { type: String, default: "" },
  website: { type: String, default: "" },
  imagePath: { type: String, default: "" },
  twitter: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  following: { type: Array, default: [] },
  followers: { type: Array, default: [] },
  verificationCode: {
    type: String,
    default: Math.floor(100000 + Math.random() * 900000).toString(),
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
