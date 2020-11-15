const mongoose = require("mongoose");

const ipModel = new mongoose.Schema({
  ipAddress: {
    type: Array,
    default: [],
  },
});
const ipmodel = mongoose.model("ipModel", ipModel);

module.exports = ipmodel;
