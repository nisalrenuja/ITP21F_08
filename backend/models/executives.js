const mongoose = require("mongoose");

const executive_Schema = new mongoose.Schema({
  exeno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("executives", executive_Schema);
