const mongoose = require("mongoose");

const assignment_Schema = new mongoose.Schema({
  assignment_name: {
    type: String,
    required: true,
  },
  client_no: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("assignment", assignment_Schema);
