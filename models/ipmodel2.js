const mongoose = require("mongoose");

const ipModel2 = new mongoose.Schema({
  users: {
    type: Array,
    default: [],
  },
});
const ipmodel2 = mongoose.model("ipModel2", ipModel2);

module.exports = ipmodel2;
