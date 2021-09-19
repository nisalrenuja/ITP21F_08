const mongoose = require("mongoose");

const final_assignment_report_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
  
  date_and_time_upload: {
    type: Date,
    required: false, 
  },

  approved_user: {
    type: String,
    required: false,
  },

  company_name: {
    type: String,
    required: false,
  },

  partner_name: {
    type: String,
    required: false,
  },

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
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("final_report", final_assignment_report_Schema);
