const mongoose = require("mongoose");

const attendance_report_Schema = new mongoose.Schema({
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
    required: false,
  },
  
});

module.exports = mongoose.model("attendance_report", attendance_report_Schema);
