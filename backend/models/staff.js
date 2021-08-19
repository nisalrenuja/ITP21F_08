const mongoose = require("mongoose");

const staff_Schema = new mongoose.Schema({
  empno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nic_no: {
    type: String,
    required: true,
  },
   email: {
    type: String,
    required: true,
  },
  commencement: {
    type: Date,
    required: true,
  },
  current_audit: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  ending_date: {
    type: Date,
    required: true,
  },
  
});

module.exports = mongoose.model("staff", staff_Schema);
