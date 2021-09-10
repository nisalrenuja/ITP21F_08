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
  reportPDF: {
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
  employee_name: {
    type: String,
    required: true,
  },
  sub_date: {
    type: Date,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reviews", review_Schema);
