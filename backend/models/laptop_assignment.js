const mongoose = require("mongoose");

const laptop_assignment_Schema = new mongoose.Schema({
  lapid: {
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
  empno: {
    type: String,
    required: true,
  },
  execid: {
    type: String,
    required: true,
  },
  date_allocated: {
    type: Date,
    required: false,
  },
  date_received: {
    type: Date,
    required: false,
  },
});
module.exports = mongoose.model("laptop_assignment", laptop_assignment_Schema);
