const mongoose = require("mongoose");

const points_Schema = new mongoose.Schema({
  empno: {
    type: Number,
    required: true,
  }, 
  points:{
    type: String,
    required: false,
  },
  date_saved:{
    type: String,
    required: false,
  } 
});

module.exports = mongoose.model("points", points_Schema);
