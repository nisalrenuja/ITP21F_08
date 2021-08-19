const mongoose = require("mongoose");

const initial_assignment_report_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  audit_year: {
    type: Number,
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
  empno_edit: {
    type: String,
    required: false,
  },
  empno: {
    type: String,
    required: true,
  },
  assignment_name: {
    type: String,
    required: true,
  },
  client_no: {
    type: String,
    required: true,
  },
  exec_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("initial_assignment_report", initial_assignment_report_Schema);
