const mongoose = require("mongoose");

const final_assignment_report_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  report: {
    type: Object,
    required: false,
  },
  date_and_time_upload: {
    type: timestamp,
    required: true,
  },
  approved_user: {
    type: String,
    required: false,
  },
  company_name: {
    type: String,
    required: true,
  },
  uploaded_partner: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("final_assignment_report", final_assignment_report_Schema);
