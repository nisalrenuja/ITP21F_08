const mongoose = require("mongoose");

const assignment_assignedtostaff_Schema = new mongoose.Schema({
  assignment_name: {
    type: String,
    required: true,
  },
  client_no: {
    type: String,
    required: true,
  },
  emp_no: {
    type: String,
    required: true,
  },
  execid: {
    type: String,
    required: true,
  },
  place_of_engagement: {
    type: String,
    required: false,
  },
  distance: {
    type: Number,
    required: false,
  },
  travel_allowance: {
    type: Number,
    required: false,
  },
  scan_invoice_allowance: {
    type: Object,
    required: false,
  },
  deadline: {
    type: Date,
    required: false,
  },
  progress: {
    type: String,
    required: false,
  },
  date_of_allocation: {
    type: Date,
    required: false,
  },
});
module.exports = mongoose.model(
  "assignment_assignedtostaff",
  assignment_assignedtostaff_Schema
);
