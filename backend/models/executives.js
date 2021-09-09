const mongoose = require("mongoose");

const employees_Schema = new mongoose.Schema({
  exeno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("executives", employees_Schema);
