const mongoose = require("mongoose");

const review_Schema = new mongoose.Schema({
  execid_review: {
    type: String,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  /*next_reviewer: {
    type: String,
    required: true,
  },
  title_of_review: {
    type: String,
    required: true,
   },*/
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reviews", review_Schema);
