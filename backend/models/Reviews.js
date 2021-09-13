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
  empno: {
    type: String,
    required: false,
  },
  sub_date: {
    type: Date,
    required: false,
  },
  due_date: {
    type: Date,
    required: false,
  },
  status: {
    type: String,
    required: true,
  },
  isAdminApprove: {
    type: Boolean,
        default: false
  },
  managerStatus: {
    type: String,
    default:"Pending"
  },
  isManagerApprove: {
    type: Boolean,
        default: false
  },
  directorStatus: {
    type: String,
    default:"Pending"
  },
  isDirectorApprove: {
    type: Boolean,
        default: false
  },
  partnerStatus: {
    type: String,
    default:"Pending"
  },
  isPartnerApprove: {
    type: Boolean,
        default: false
  },
});

module.exports = mongoose.model("Reviews", review_Schema);
