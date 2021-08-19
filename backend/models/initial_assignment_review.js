const mongoose = require("mongoose");

const initial_assignment_review_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  execid_review: {
    type: String,
    required: true,
  },
  report: {
    type: Object,
    required: true,
  },
  date_and_time_review: {
    type: timestamp,
    required: true,
  },
   points: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  next_reviewer: {
    type: String,
    required: true,
  },
  title_of_review: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model("initial_assignment_review", initial_assignment_review_Schema);
